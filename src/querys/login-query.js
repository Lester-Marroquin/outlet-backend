const { db } = require("../config/connection");

const nombreTabla1 = "Empleado";
const nombreTabla2 = "Usuario";

const obtenerEmpleado = async (id) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla1)
      .where("UsuarioEmpleado", id)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
};

const obtenerUsuario = async (id) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla2)
      .where("UsuarioID", id)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  obtenerEmpleado,
  obtenerUsuario
};
