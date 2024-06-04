const { db } = require("../config/connection");

const nombreTabla = 'DetalleRol';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla)
    .orderBy(`${nombreTabla1}.CodProducto`, 'asc');
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where('CodRol', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla).insert(data);
    await tr.commit();
    return await db(nombreTabla).where("CodDetalleRol", result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla).where("CodDetalleRol", id).update(data);
    await tr.commit();
    return await db.select().where("CodDetalleRol", id).table(nombreTabla).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar
};
