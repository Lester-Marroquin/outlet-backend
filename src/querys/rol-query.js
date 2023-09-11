const { db } = require('../config/connection');

const nombreTabla1 = 'Rol';
const nombreTabla2 = 'DetalleRol';

const obtenerTodo = async () => {
  try {
    return await db.select().from(nombreTabla1).leftJoin(nombreTabla2, 'Rol.CodRol', 'DetalleRol.CodRol')
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().from(nombreTabla1).leftJoin(nombreTabla2, 'Rol.CodRol', 'DetalleRol.CodRol').where('Rol.CodRol', id)
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla1)
      .whereRaw('LOWER(NombreRol) like ?', `%${data.NombreRol.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  try {
    const result = await db(nombreTabla1).insert(data);
    return await db(nombreTabla1).where('CodRol', result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    await db(nombreTabla1).where('CodRol', id).update(data);
    return await db.select().where('CodRol', id).table(nombreTabla1).first();
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
