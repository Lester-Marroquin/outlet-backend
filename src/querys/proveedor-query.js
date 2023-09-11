const { db } = require('../config/connection');

const nombreTabla = 'Proveedor';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    return await db.select().where('CodProveedor', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(data) => {
  try {
    const result = await db
      .select()
      .from(nombreTabla)
      .where(function () {
        this.whereRaw('LOWER(RazonSocial) like ?', `%${data.RazonSocial.toLowerCase()}%`)
          .orWhereRaw('LOWER(NombreComercial) like ?', `%${data.NombreComercial.toLowerCase()}%`);
      }).first();
    return result;
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  try {
    const result = await db(nombreTabla).insert(data);
    return await db(nombreTabla).where('CodProveedor', result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    await db(nombreTabla).where('CodProveedor', id).update(data);
    return await db.select().where('CodProveedor', id).table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const eliminar = async (id) => {
  try {
    await db(nombreTabla).where('CodProveedor', id).update({CodEstado: 2});
    return await db(nombreTabla).where('CodProveedor', id).first();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  consultarExiste,
  crear,
  actualizar,
  eliminar
};
