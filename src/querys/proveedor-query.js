const { db } = require("../config/connection");

const nombreTabla = "Proveedor";

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where("CodProveedor", id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  try {
    const result = await db(nombreTabla).insert(data);
    return await db(nombreTabla).where("CodProveedor", result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    const result = await db(nombreTabla).where("CodProveedor", id).update(data);
    return await db(nombreTabla).where('CodProveedor', id).first();
  } catch (e) {
    throw e;
  }
};

//Las personas no se van a eliminar logicamente, siempre se van a mantener los datos,
//Se van a inhabilitar los usuarios o los empleados, pero no los datos de la persona persistiran.

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar
};
