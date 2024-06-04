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
    .orderBy(`${nombreTabla1}.CodProducto`, 'asc');
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {

    return await db(nombreTabla1)
    .select(`${nombreTabla}.NombreSucursal`, `${nombreTabla1}.DireccionSucursal`, `${nombreTabla2}.Municipio`, `${nombreTabla3}.Departamento`)
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
      .from(nombreTabla)
      .whereRaw('LOWER(NombreSucursal) like ?', `%${data.NombreSucursal.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla).insert(data);
    await tr.commit();
    return await db(nombreTabla).where('CodSucursal', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla).where('CodSucursal', id).update(data);
    await tr.commit();
    return await db.select().where('CodSucursal', id).table(nombreTabla).first();
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
