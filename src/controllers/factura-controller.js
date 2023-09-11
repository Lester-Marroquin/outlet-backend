const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/factura-schema');
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
  
    const numero = data.NumeroFactura;
    const serie = data.SerieFactura
  
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
    
    const numero = body.NumeroFactura;
    const serie = body.SerieFactura

    const validacion = validar(body);
    if (validacion) {
      return responseFail({message: 'Los datos no son validos', statusCode: StatusCodes.BAD_REQUEST})
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

    const numero = body.NumeroFactura;
    const serie = body.SerieFactura

    const validacion = validar(body);
    if (validacion) {
      return responseFail({message: 'Los datos no son validos', statusCode: StatusCodes.BAD_REQUEST})
    }

    const result = await query.actualizar(numero, serie);
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
