const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/empleado-schema');
const controller = require('../controllers/persona-controller');
const query  = require('../querys/empleado-query');
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
    const dataEmpleado = body.Empleado;

    const validacion = validar(dataEmpleado)
    
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para crear al empleado', statusCode: StatusCodes.BAD_REQUEST})
    }

    const resultPersona = await controller.crear(dataPersona);

    if (resultPersona.data == null) {
      return responseFail({message: resultPersona.message, statusCode: StatusCodes.CONFLICT})
    }

    dataEmpleado.CodPersona = resultPersona.data.CodPersona;

    const resultEmpleado = await query.crear(dataEmpleado);
    if (!resultEmpleado) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }

    return responseSuccess({data: resultEmpleado, message: 'Empleado creado exitosamente'});
  
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const actualizar = async (body, id) => {
  try {

    const dataPersona = body.Persona;
    const dataEmpleado = body.Empleado;

    const validacion = validar(dataEmpleado)
    
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para actualizar al empleado', statusCode: StatusCodes.BAD_REQUEST})
    }

    const resultPersona = await controller.actualizar(dataPersona, dataPersona.CodPersona);
    
    if (resultPersona.data == null) {
      return responseFail({message: resultPersona.message, statusCode: StatusCodes.CONFLICT})    
    }

    dataEmpleado.CodPersona = resultPersona.data.CodPersona;dataEmpleado.CodPersona = resultPersona.data.CodPersona;

    const resultEmpleado = await query.actualizar(dataEmpleado, id);
    if (!resultEmpleado) {
      
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: resultEmpleado, message: 'Empleado actualizado exitosamente'});
  
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
