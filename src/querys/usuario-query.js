const { db } = require('../config/connection');

const nombreTabla = 'Usuario';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where('UsuarioID', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  try {
    //Insertar los valor de usuario en la tabla Usuario
    await db(nombreTabla).insert(data);
    
    // Asignamos el valor de UsuarioID a una variable
    const usuarioID = data.UsuarioID;

    //Busqueda del valor ingresado en base al parametro que tremos en data
    return await db(nombreTabla).where('UsuarioID', usuarioID).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    await db(nombreTabla).where('UsuarioID', id).update(data);
    return await db(nombreTabla).where('UsuarioID', id).first();
  } catch (e) {
    throw e;
  }
};

const eliminar = async (id) => {
  try {
    await db(nombreTabla).where('UsuarioID', id).update({CodEstado: 2});
    return await db(nombreTabla).where('UsuarioID', id).first();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar,
  eliminar
};
