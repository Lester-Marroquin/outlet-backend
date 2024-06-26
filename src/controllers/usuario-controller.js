const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/usuario-schema');
const query  = require('../querys/usuario-query');
const bcrypt = require('bcrypt');
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
  
    const validacion = validar(body)
    
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para crear un Usuario', statusCode: StatusCodes.BAD_REQUEST})
    }

    //Encriptación de ClaveUsuario
    //SALTROUND = variable de entorno   
    const saltRounds = parseInt(process.env.SALTROUND);
    body.ClaveUsuario = bcrypt.hashSync(body.ClaveUsuario, saltRounds);

    const result = await query.crear(body);

    if (!result) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }

    //Destructruación de Usuario
    const { ClaveUsuario, ...dataResult} = result

    return responseSuccess({data: dataResult, message: 'Usuario creado exitosamente'});
  
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const actualizar = async (body, id) => {
  try {

    const validacion = validar(body)

    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para actualizar al Usuario', statusCode: StatusCodes.BAD_REQUEST})
    }

    //Encriptación de ClaveUsuario
    //SALTROUND = variable de entorno   
    const saltRounds = parseInt(process.env.SALTROUND);
    body.ClaveUsuario = bcrypt.hashSync(body.ClaveUsuario, saltRounds);

    const result = await query.actualizar(body, id);
    if (!result) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }

    //Destructruación de Usuario
    const { ClaveUsuario, ...dataResult} = result

    return responseSuccess({data: dataResult, message: 'Usuario actualizado exitosamente'});
  
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
