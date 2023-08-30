const { db } = require("../config/connection");

const nombreTabla = "Usuario";
const nombreTabla2 = "Persona";

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where("UsuarioID", id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  try {
    const result = await db(nombreTabla).insert(data);
    return await db(nombreTabla).where("UsuarioID", result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    const result = await db(nombreTabla).where("UsuarioID", id).update(data);
    return await db(nombreTabla).where('UsuarioID', id).first();
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
