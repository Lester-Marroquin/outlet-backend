const { db } = require('../config/connection');

const nombreTabla = 'MarcaProducto';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where('CodMarcaProducto', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla)
      .whereRaw('LOWER(MarcaProducto) like ?', `%${data.MarcaProducto.toLowerCase()}%`)
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
    return await db(nombreTabla).where('CodMarcaProducto', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla).where('CodMarcaProducto', id).update(data);
    await tr.commit();
    return await db.select().where('CodMarcaProducto', id).table(nombreTabla).first();
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
