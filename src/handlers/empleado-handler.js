'use strict';
const { parseResponse } = require('../helpers/response')
const controllerE = require('../controllers/empleado-controller');
const controllerP = require('../controllers/persona-controller');
const controllerU = require('../controllers/usuario-controller');
// const { validarJWT } = require('../helpers/validar-jwt')

const obtenerTodo = async () => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);
  const response = await controllerE.obtenerTodo();
  return parseResponse(response);
};

const obtenerUno = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);
  const response = await controllerE.obtenerUno(event.pathParameters.id);
    return parseResponse(response);
};

const crear = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);
  const data = JSON.parse(event.body)
  
  // Guardamos los datos de persona
  const responseP = await controllerP.crear(data.Persona);
  
  if (responseP.data == null) {
    return parseResponse(responseP);
  }

  // Asignamos el CodPersona creado a la data para Empleado
  data.Empleado.CodPersona = responseP.data.CodPersona 

  // Creamos el empleado 
  const responseE = await controllerE.crear(data.Empleado);

  if (responseE.data == null) {
    return parseResponse(responseE);
  }

  // Asignamos el CodPersona creado a la data para Usuario
  data.Usuario.CodPersona = responseP.data.CodPersona
  
  // Creamos el usuario
  const responseU = await controllerU.crear(data.Usuario);

  if (responseU.data == null) {
    return parseResponse(responseU);
  }

  return parseResponse(responseU);
};

const actualizar = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);

  const response = await controllerE.actualizar(JSON.parse(event.body), event.pathParameters.id);
  return parseResponse(response);
};

const eliminar = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);

  const response = await controllerE.eliminar(event.pathParameters.id);
  return parseResponse(response);
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar,
  eliminar
};
