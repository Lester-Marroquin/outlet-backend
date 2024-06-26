const { db } = require('../config/connection');

const nombreTabla1 = 'Persona';
const nombreTabla2 = 'TipoIdentificacion';
const nombreTabla3 = 'Municipio';
const nombreTabla4 = 'Departamento';

const obtenerTodo = async () => {
  try {
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodTipoIdentificacion`, '=', `${nombreTabla2}.CodTipoIdentificacion`)
    .join(nombreTabla3, `${nombreTabla1}.CodMunicipio`, '=', `${nombreTabla3}.CodMunicipio`)
    .join(nombreTabla4, `${nombreTabla3}.CodDepartamento`, '=', `${nombreTabla4}.CodDepartamento`)
    .orderBy(`${nombreTabla1}.CodPersona`, 'asc')
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodTipoIdentificacion`, '=', `${nombreTabla2}.CodTipoIdentificacion`)
    .join(nombreTabla3, `${nombreTabla1}.CodMunicipio`, '=', `${nombreTabla3}.CodMunicipio`)
    .join(nombreTabla4, `${nombreTabla3}.CodDepartamento`, '=', `${nombreTabla4}.CodDepartamento`)
    .where('CodPersona', id).first();
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla1)
      .whereRaw('LOWER(Nombre) like ?', `%${data.Nombre.toLowerCase()}%`)
      .andWhereRaw('LOWER(Apellido) like ?', `%${data.Apellido.toLowerCase()}%`)
      .orWhere('NumeroIdentificacion', data.NumeroIdentificacion)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla1).insert(data);
    await tr.commit();
    return await db(nombreTabla1).where('CodPersona', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla1).where('CodPersona', id).update(data);
    await tr.commit();
    return await db(nombreTabla1).where('CodPersona', id).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  consultarExiste,
  crear,
  actualizar
};
