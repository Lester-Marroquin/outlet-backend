const { db } = require('../config/connection');

const nombreTabla = 'Estado';

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
    return await db.select().where('CodEstado', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};


const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla)
      .whereRaw('LOWER(Estado) like ?', `%${data.Estado.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla).insert(data);
    await tr.commit();
    return await db(nombreTabla).where('CodEstado', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla).where('CodEstado', id).update(data);
    await tr.commit();
    return await db.select().where('CodEstado', id).table(nombreTabla).first();
  } catch (e) {
    await tr.rollback();
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
