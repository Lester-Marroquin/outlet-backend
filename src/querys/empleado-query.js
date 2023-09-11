const { db } = require('../config/connection');

const nombreTabla = 'Empleado';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where('CodEmpleado', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  try {
    const result = await db(nombreTabla).insert(data);
    return await db(nombreTabla).where('CodEmpleado',  result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    await db(nombreTabla).where('CodEmpleado', id).update(data);
    return await db(nombreTabla).where('CodEmpleado', id).first();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar
};
