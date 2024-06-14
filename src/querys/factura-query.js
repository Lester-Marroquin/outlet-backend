const { db } = require('../config/connection');

const nombreTabla1 = 'Factura';
const nombreTabla2 = 'DetalleFactura';
const nombreTabla3 = 'Persona';
const nombreTabla4 = 'Sucursal';
const nombreTabla5 = 'Producto';

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

const actualizarInventario = async (dataDetalleFactura, operacion) => {
  const tr = await db.transaction();
  try {
    const idsProductos = [];
    for (let i = 0; i < dataDetalleFactura.length; i++) {
      idsProductos.push(dataDetalleFactura[i].CodProducto);    
    }
    const productos = await db(nombreTabla5).whereIn('CodProducto', idsProductos);
    if (operacion) {
      for (let i = 0; i < productos.length; i++) {
        const cantidadNueva = productos[i].Cantidad - dataDetalleFactura[i].Cantidad;
        productos[i].Cantidad = cantidadNueva;
        await tr(nombreTabla5).where('CodProducto', productos[i].CodProducto).update(productos[i]);
      }
    } else {
      for (let i = 0; i < productos.length; i++) {
        const cantidadNueva = productos[i].Cantidad + dataDetalleFactura[i].Cantidad;
        productos[i].Cantidad = cantidadNueva;
        await tr(nombreTabla5).where('CodProducto', productos[i].CodProducto).update(productos[i]);
      }
    }
    await tr.commit();
    return true
  } catch (e) {
    await tr.rollback();
    throw e;
  }
}

const crear = async (data) => {
  const tr = await db.transaction();
  try {

    const dataFactura = data.Factura;
    const dataDetalleFactura = data.DetalleFactura;

    await tr(nombreTabla1).insert(dataFactura);
    await tr(nombreTabla2).insert(dataDetalleFactura);

    const result = await actualizarInventario(dataDetalleFactura, operacion = true);

    const Factura = await db(nombreTabla1)
      .select()
      .where('NumeroFactura', dataFactura.NumeroFactura)
      .andWhere('SerieFactura', dataFactura.SerieFactura)
      .first();

    const DetalleFactura = await db(nombreTabla2)
      .select()
      .where('NumeroFactura', dataFactura.NumeroFactura)
      .andWhere('SerieFactura', dataFactura.SerieFactura);

    if (result) {
      await tr.commit();  
    }
   
    return data = { Factura, DetalleFactura };

  } catch (e) {
    await tr.rollback();
    throw e;
  }
};

const actualizar = async (numero, serie, data) => {
  const tr = await db.transaction();
  try {

    const dataFactura = data.Factura;
    const dataDetalleFactura = data.DetalleFactura;

    await tr(nombreTabla1)
    .where('NumeroFactura', numero)
    .andWhere('SerieFactura', serie).update(dataFactura);

    for (let i = 0; i < dataDetalleFactura.length; i++) {
        await tr(nombreTabla2)
        .where('CodDetalleFactura', dataDetalleFactura[i].CodDetalleFactura)
        .update(dataDetalleFactura[i])
    }

    const result = await actualizarInventario(dataDetalleFactura, operacion = false);

    const Factura = await db(nombreTabla1)
    .select()
    .where('NumeroFactura', dataFactura.NumeroFactura)
    .andWhere('SerieFactura', dataFactura.SerieFactura)
    .first();

    const DetalleFactura = await db(nombreTabla2)
    .select()
    .where('NumeroFactura', dataFactura.NumeroFactura)
    .andWhere('SerieFactura', dataFactura.SerieFactura);

    if (result) {
      await tr.commit();  
    }

    return data = { Factura, DetalleFactura };
    
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
