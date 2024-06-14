const { db } = require('../config/connection');

const nombreTabla1 = 'OrdenServicio';


const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla1);
  } catch (e) {
    throw e;  
  }
};

const obtenerUno = async (id) => {
  try {
    return await db(nombreTabla1).select().where('CodOrdenServicio', id).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla1).insert(data);
    await tr.commit();
    return await db(nombreTabla1).where('CodOrdenServicio', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla1).where('CodOrdenServicio', id).update(data);
    await tr.commit();
    return await db.select().where('CodOrdenServicio', id).table(nombreTabla1).first();
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
