const { db } = require('../config/connection');
const fs = require("fs");

const nombreTabla = 'CategoriaProducto';

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
    return await db.select().where('CodCategoriaProducto', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla)
      .whereRaw('LOWER(CategoriaProducto) like ?', `%${data.CategoriaProducto.toLowerCase()}%`)
      .first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {

    //Lee el archivo de imagen y se convierte a una cadena de texto en formato Base64
    const imagenBase64 = fs.readFileSync(data.Imagen, 'base64');

    //Se agrega la imagen en formato Base64 a la data
    data.Imagen = imagenBase64;

    const result = await tr(nombreTabla).insert(data);
    await tr.commit();
    return await db(nombreTabla).where('CodCategoriaProducto', result[0]).first();
  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (data, id) => {
  const tr = await db.transaction();
  try {
    await tr(nombreTabla).where('CodCategoriaProducto', id).update(data);
    await tr.commit();
    return await db.select().where('CodCategoriaProducto', id).table(nombreTabla).first();
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
