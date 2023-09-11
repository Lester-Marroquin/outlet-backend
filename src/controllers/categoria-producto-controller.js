const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/categoria-producto-schema');
const query  = require('../querys/categoria-producto-query');
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

const obtenerUno = async (id) => {
  try {
    const result = await query.obtenerUno(id);
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
       
    const validacion = validar(body);
    if (validacion) {
      return responseFail({message: 'Los datos no son validos para crear una categoria de producto', statusCode: StatusCodes.BAD_REQUEST})
    }

    const consulta = await query.consultarExiste(body);
    if (consulta) {
      return responseFail({message: `La Categoria de producto ya se encuentra creada con el ID: ${consulta.CodCategoriaProducto}`, statusCode: StatusCodes.CONFLICT})
    }

    const result = await query.crear(body);
    if (!result) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result, message: 'Categoria de producto creada exitosamente'});
  
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const actualizar = async (body, id) => {
  try {

    const validacion = validar(body);
    if (validacion) {
      return responseFail({message: 'Los datos no son validos para la actualización', statusCode: StatusCodes.BAD_REQUEST})
    }

    const result = await query.actualizar(body, id);
    if (!result) {
      return responseFail({message: 'Error en la actualización de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result, message: 'Catagoria de producto actualizada exitosamente'});

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
