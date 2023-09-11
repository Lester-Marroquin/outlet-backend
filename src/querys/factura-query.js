const { db } = require('../config/connection');

const nombreTabla = 'Factura';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla);
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (numero, serie) => {
  try {
    return await db.select()
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie)
    .table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(numero, serie) => {
  try {
    return await db.select()
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie)
    .table(nombreTabla).first();
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  try {
    const result = await db(nombreTabla).insert(data);
    return await db(nombreTabla)
    .where('NumeroFactura', result[0])
    .andWhere('SerieFactura', result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (numero, serie) => {
  try {
    await db(nombreTabla).where('NumeroFactura', numero).andWhere('SerieFactura', serie).update(data);
    return await db.select().where('NumeroFactura', numero).andWhere('SerieFactura', serie)
    .table(nombreTabla).first();
  } catch (e) {
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
