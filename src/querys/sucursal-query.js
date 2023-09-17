const { db } = require('../config/connection');

const nombreTabla1 = 'Sucursal';
const nombreTabla2 = 'Municipio';
const nombreTabla3 = 'Departamento';

const obtenerTodo = async () => {
  try {
    return await db(nombreTabla1)
    .select()
    .join(nombreTabla2, 'Sucursal.CodMunicipio', '=', 'Municipio.CodMunicipio')
    .join(nombreTabla3, 'Municipio.CodDepartamento', '=', 'Departamento.CodDepartamento')
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db(nombreTabla1)
    .select(`${nombreTabla1}.NombreSucursal`, `${nombreTabla1}.DireccionSucursal`, `${nombreTabla2}.Municipio`, `${nombreTabla3}.Departamento`)
    .join(nombreTabla2, 'Sucursal.CodMunicipio', '=', 'Municipio.CodMunicipio')
    .join(nombreTabla3, 'Municipio.CodDepartamento', '=', 'Departamento.CodDepartamento')
    .where('CodSucursal', id).first()
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla1)
      .whereRaw('LOWER(NombreSucursal) like ?', `%${data.NombreSucursal.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  try {
    const result = await db(nombreTabla1).insert(data);
    return await db(nombreTabla1).where('CodSucursal', result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    await db(nombreTabla1).where('CodSucursal', id).update(data);
    return await db.select().where('CodSucursal', id).table(nombreTabla1).first();
  } catch (e) {
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
