const { db } = require('../config/connection');

const nombreTabla = 'Departamento';
const nombreTabla2 = 'Municipio';

const obtenerDepartamentos = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerMunicipios = async (id) => {
  try {
    
    return await db.select().table(nombreTabla2).where('CodDepartamento', id)
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla2)
      .whereRaw('LOWER(Municipio) like ?', `%${data.Municipio.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla2).insert(data);
    await tr.commit();
    return await db(nombreTabla2).where('CodMunicipio', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla2).where('CodMunicipio', id).update(data);
    await tr.commit();
    return await db.select().where('CodMunicipio', id).table(nombreTabla2).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

module.exports = {
  obtenerDepartamentos,
  obtenerMunicipios,
  consultarExiste,
  crear,
  actualizar
};
