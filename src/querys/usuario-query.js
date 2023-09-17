const { db } = require('../config/connection');

const nombreTabla1 = 'Usuario';
const nombreTabla2 = 'Persona';

//Modificar los metodos de esta clase

const obtenerTodo = async () => {
  try {
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .where('CodUsuario', id).first();
  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  try {
    const result = await db(nombreTabla1).insert(data);
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .where('CodUsuario', result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    await db(nombreTabla1).where('CodUsuario', id).update(data);
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .where('CodUsuario', id).first();
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
