const { responseSuccess, responseFail } = require("../helpers/response");
const { validar } = require("../schemas/empleado-schema");
const query = require("../querys/empleado-query");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const obtenerTodo = async () => {
  try {
    const result = await query.obtenerTodo();
    if (!result) {
      return responseFail({
        message: "No se encontraron datos",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return responseSuccess({ data: result });
  } catch (e) {
    return responseFail({
      message: e,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    });
  }
};

const obtenerUno = async (id) => {
  try {
    const result = await query.obtenerUno(id);
    if (!result) {
      return responseFail({
        message: "No se encontraron datos",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return responseSuccess({ data: result });
  } catch (e) {
    return responseFail({
      message: e,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    });
  }
};

const crear = async (body) => {
  try {
    const validacion = validar(body);

    if (validacion) {
      return responseFail({
        data: validacion.details[0].message,
        message: "Los datos no son validos para crear un Emplado",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    //Cuando el usuario inicie sesión por primera vez se verificara si esta vacio el campo de DB
    //Si lo esta pedira ingresar clave de lo contrario validara si es la clave correcta

    //Encriptación de ClaveEmpleado
    //SALTROUND = variable de entorno
    const saltRounds = parseInt(process.env.SALTROUND);
    body.ClaveEmpleado = bcrypt.hashSync(body.ClaveEmpleado, saltRounds);

    const result = await query.crear(body);

    if (!result) {
      return responseFail({
        message: "Error en la creación de Empleado",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    //Destructruación de Empleado para retornar datos sin Clave
    const { ClaveEmpleado, ...dataResult } = result;

    return responseSuccess({
      data: dataResult,
      message: "Empleado creado exitosamente",
    });
  } catch (e) {
    return responseFail({
      message: e,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    });
  }
};

const actualizar = async (body, id) => {
  try {
    const validacion = validar(body);

    if (validacion) {
      return responseFail({
        data: validacion.details[0].message,
        message: "Los datos no son validos para actualizar al empleado",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    //Encriptación de ClaveEmpleado
    //SALTROUND = variable de entorno
    const saltRounds = parseInt(process.env.SALTROUND);
    body.ClaveEmpleado = bcrypt.hashSync(body.ClaveEmpleado, saltRounds);

    const result = await query.actualizar(body, id);
    if (!result) {
      return responseFail({
        message: "Error en la inserción de datos",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    //Destructruación de Empleado
    const { ClaveEmpleado, ...dataResult } = result;

    return responseSuccess({
      data: dataResult,
      message: "Empleado actualizado exitosamente",
    });
  } catch (e) {
    return responseFail({
      message: e,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    });
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar,
};
