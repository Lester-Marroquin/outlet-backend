const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/factura-schema');
const { validarDetalle } = require('../schemas/detalle-factura-schema');
const query  = require('../querys/factura-query');
const { StatusCodes } = require('http-status-codes');

const obtenerTodo = async () => {
  try {
    const result = await query.obtenerTodo();
    if(!result){
      return responseFail({message: 'No se encontraron datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result});
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const obtenerUno = async (data) => {
  try {
  
    const numero = data.queryStringParameters.NumeroFactura;
    const serie = data.queryStringParameters.SerieFactura;
  
    const result = await query.obtenerUno(numero, serie);
    if (!result) {
      return responseFail({message: 'No se encontraron datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result});
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
}

const crear = async (body) => {
  try {
    
    const numero = body.Factura.NumeroFactura;
    const serie = body.Factura.SerieFactura

    const validacionFactura = validar(body.Factura);
    if (validacionFactura) {
      return responseFail({data: validacionFactura.details[0].message, message: 'Los datos de la factura no son validos', statusCode: StatusCodes.BAD_REQUEST})
    } else {

      for (let i = 0; i < body.DetalleFactura.length; i++) {
        const data = body.DetalleFactura[i];
        const validacionDetalle = validarDetalle(data);

        if (validacionDetalle) {
          return responseFail({data: validacionDetalle.details[0].message, message: 'Los datos del detalle de la factura no son validos', statusCode: StatusCodes.BAD_REQUEST})
        }
      }
    }

    const consulta = await query.consultarExiste(numero, serie);
    if (consulta) {
      return responseFail({message: `La Factura ya se encuentra creada con número: ${consulta.NumeroFactura} y serie: ${consulta.SerieFactura}`, statusCode: StatusCodes.CONFLICT})
    }

    const result = await query.crear(body);
    if (!result) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    } 

    return responseSuccess({data: result, message: 'Factura guardada exitosamente'});
  
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const actualizar = async (body) => {
  try {

    const numero = body.queryStringParameters.NumeroFactura;
    const serie = body.queryStringParameters.SerieFactura;
    const data = JSON.parse(body.body)
    
    const validacion = validar(data.Factura);
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos', statusCode: StatusCodes.BAD_REQUEST})
    } else {

      for (let i = 0; i < data.DetalleFactura.length; i++) {
        const DetalleFactura = data.DetalleFactura[i];
        const validacionDetalle = validarDetalle(DetalleFactura);

        if (validacionDetalle) {
          return responseFail({data: validacionDetalle.details[0].message, message: 'Los datos del detalle de la factura no son validos', statusCode: StatusCodes.BAD_REQUEST})
        }
      }
    }

    const result = await query.actualizar(numero, serie, data);
    if (!result) {
      return responseFail({message: 'Error en la actualización de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result, message: 'Factura actualizada exitosamente'});

  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar
};
