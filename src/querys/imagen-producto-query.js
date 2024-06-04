const { db } = require('../config/connection');

const nombreTabla = 'ImagenProducto';

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
    return await db(nombreTabla).select().where('CodProducto', id);
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla)
      .whereRaw('LOWER(ImagenUrl) like ?', `%${data.ImagenUrl.toLowerCase()}%`)
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
    return await db(nombreTabla).where('CodImagenProducto', result[0]).first();
    await tr.rollback();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla).where('CodImagenProducto', id).update(data);
    await tr.commit();
    return await db.select().where('CodImagenProducto', id).table(nombreTabla).first();
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
