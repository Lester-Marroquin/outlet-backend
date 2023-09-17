const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/usuario-schema');
const controller = require('../controllers/persona-controller');
const query  = require('../querys/usuario-query');
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
       
    const dataPersona = body.Persona;
    const dataUsuario = body.Usuario;

    const validacion = validar(dataUsuario)
    
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para crear el usuario', statusCode: StatusCodes.BAD_REQUEST})
    }

    const resultPersona = await controller.crear(dataPersona);

    if (resultPersona.data == null) {
      return responseFail({message: resultPersona.message, statusCode: StatusCodes.CONFLICT})
    }

    dataUsuario.CodPersona = resultPersona.data.CodPersona;

    const resultUsuario = await query.crear(dataUsuario);
    if (!resultUsuario) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }

    return responseSuccess({data: resultUsuario, message: 'Usuario creado exitosamente'});
  
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const actualizar = async (body, id) => {
  try {
    const dataPersona = body.Persona;
    const dataUsuario = body.Usuario;

    const validacion = validar(dataUsuario)
    
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para actualizar al Usuario', statusCode: StatusCodes.BAD_REQUEST})
    }

    const resultPersona = await controller.actualizar(dataPersona, dataPersona.CodPersona);
    
    if (resultPersona.data == null) {
      return responseFail({message: resultPersona.message, statusCode: StatusCodes.CONFLICT})    
    }

    dataUsuario.CodPersona = resultPersona.data.CodPersona;

    const resultUsuario = await query.actualizar(dataUsuario, id);
    if (!resultUsuario) {
      
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: resultUsuario, message: 'Usuario actualizado exitosamente'});
  
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
