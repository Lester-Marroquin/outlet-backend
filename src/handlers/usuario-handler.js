'use strict';
const { parseResponse } = require('../helpers/response')
// const { responseFail } = require('../helpers/response')
const controller = require('../controllers/usuario-controller');
const controllerP = require('../controllers/persona-controller');
// const { validarJWT } = require('../helpers/validar-jwt')

const obtenerTodo = async () => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);
  const response = await controller.obtenerTodo();
  return parseResponse(response);
};

const obtenerUno = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);
  const response = await controller.obtenerUno(event.pathParameters.id);
    return parseResponse(response);
};

const crear = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);
  const data = JSON.parse(event.body)
  const responseP = await controllerP.crear(data.Persona);
 
  if (responseP.data == null) {
    return parseResponse(responseP);
  }

  data.Usuario.CodPersona = responseP.data.CodPersona

  const response = await controller.crear(data.Usuario);
  return parseResponse(response);
};

const actualizar = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);

  const response = await controller.actualizar(JSON.parse(event.body), event.pathParameters.id);
  return parseResponse(response);
};

const eliminar = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);

  const response = await controller.eliminar(event.pathParameters.id);
  return parseResponse(response);
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar,
  eliminar
};
