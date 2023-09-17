const { db } = require('../config/connection');

const nombreTabla1 = 'Factura';
const nombreTabla2 = 'DetalleFactura';
const nombreTabla3 = 'Persona';
const nombreTabla4 = 'Sucursal';

const obtenerTodo = async () => {
  try {
    return await db.select().table(nombreTabla1)
    .join({ p: nombreTabla3 }, `${nombreTabla1}.CodPersona`, '=', `p.CodPersona`)
    .join({ s: nombreTabla4 }, `${nombreTabla1}.CodSucursal`, '=', `s.CodSucursal`)
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (numero, serie) => {
  try {
    const Factura = await db(nombreTabla1)
    .select()
    .join({ p: nombreTabla3 }, `${nombreTabla1}.CodPersona`, '=', `p.CodPersona`)
    .join({ s: nombreTabla4 }, `${nombreTabla1}.CodSucursal`, '=', `s.CodSucursal`)
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie)
    .first();

    const DetalleFactura = await db(nombreTabla2)
    .select()
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie);

    return data = { Factura, DetalleFactura };

  } catch (e) {
    throw e;
  }
};

const consultarExiste = async(numero, serie) => {
  try {
    return await db(nombreTabla1)
    .select()
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie)
    .first();
  } catch (e) {
    throw e;
  }
}

const crear = async (data) => {
  try {

    const dataFactura = data.Factura;
    const dataDetalleFactura = data.DetalleFactura;

    await db(nombreTabla1).insert(dataFactura);

    for (let i = 0; i < dataDetalleFactura.length; i++) {
      await db(nombreTabla2).insert(dataDetalleFactura[i]);
      
    }

    const Factura = await db(nombreTabla1)
    .select()
    .where('NumeroFactura', dataFactura.NumeroFactura)
    .andWhere('SerieFactura', dataFactura.SerieFactura)
    .first();

    const DetalleFactura = await db(nombreTabla2)
    .select()
    .where('NumeroFactura', dataFactura.NumeroFactura)
    .andWhere('SerieFactura', dataFactura.SerieFactura);

    return data = { Factura, DetalleFactura };

  } catch (e) {
    throw e;
  }
};

const actualizar = async (numero, serie, data) => {
  try {
    await db(nombreTabla1)
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie).update(data);
    return await db.select().where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie)
    .table(nombreTabla1).first();
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
