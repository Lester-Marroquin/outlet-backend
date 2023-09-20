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
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla1).insert(data);
    
    await tr.commit();

    return await db(nombreTabla1).select()
    .join({p: nombreTabla2}, `${nombreTabla1}.CodPersona`, '=', `p.CodPersona`)
    .where('CodUsuario', result[0]).first();

  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {

    await tr(nombreTabla1).where('CodUsuario', id).update(data);
    
    await tr.commit();
    
    return await db(nombreTabla1).select()
    .join({p: nombreTabla2}, `${nombreTabla1}.CodPersona`, '=', `p.CodPersona`)
    .where('CodUsuario', id).first();

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
