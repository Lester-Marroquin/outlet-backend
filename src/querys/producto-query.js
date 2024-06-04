const { db } = require('../config/connection');
const fs = require("fs");

const nombreTabla1 = 'Producto';
const nombreTabla2 = 'ImagenProducto';
const nombreTabla3 = 'MarcaProducto';
const nombreTabla4 = 'CategoriaProducto';

const obtenerTodo = async () => {
  try {
    return await db(nombreTabla1)
    .select()
    .join(nombreTabla3, `${nombreTabla1}.CodMarcaProducto`, '=', `${nombreTabla3}.CodMarcaProducto`)
    .join(nombreTabla4, `${nombreTabla1}.CodCategoriaProducto`, '=', `${nombreTabla4}.CodCategoriaProducto`)
    .orderBy(`${nombreTabla1}.CodProducto`, 'asc')
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    const Producto = await db(nombreTabla1).select()
    .join(nombreTabla3, `${nombreTabla1}.CodMarcaProducto`, '=', `${nombreTabla3}.CodMarcaProducto`)
    .join(nombreTabla4, `${nombreTabla1}.CodCategoriaProducto`, '=', `${nombreTabla4}.CodCategoriaProducto`)
    .where('CodProducto', id).first();
    
    const ImagenProducto = await db(nombreTabla2).select().where('CodProducto', id)
    
    return data = { Producto, ImagenProducto}
  } catch (e) {
    throw e;
  }
};

const obtenerPorCategoria = async (CodCategoriaProducto) => {
  try {
    return await db(nombreTabla1)
      .select()
      .join(
        nombreTabla3,
        `${nombreTabla1}.CodMarcaProducto`,
        "=",
        `${nombreTabla3}.CodMarcaProducto`
      )
      .join(
        nombreTabla4,
        `${nombreTabla1}.CodCategoriaProducto`,
        "=",
        `${nombreTabla4}.CodCategoriaProducto`
      )
      .where(`${nombreTabla1}.CodCategoriaProducto`, CodCategoriaProducto);
  } catch (e) {
    throw e;
  }
};


const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla1)
      .whereRaw('LOWER(Producto) like ?', `%${data.Producto.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {
    const result = await tr(nombreTabla1).insert(data);
    await tr.commit();
    return await db(nombreTabla1).where('CodProducto', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla1).where('CodProducto', id).update(data);
    await tr.commit();
    return await db.select().where('CodProducto', id).table(nombreTabla1).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  obtenerPorCategoria,
  consultarExiste,
  crear,
  actualizar
};
