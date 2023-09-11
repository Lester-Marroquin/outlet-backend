'use strict';
const { parseResponse } = require('../helpers/response')
const controller = require('../controllers/estado-controller');
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
  const response = await controller.crear(JSON.parse(event.body));
  return parseResponse(response);
};

const actualizar = async (event) => {
  // const unauthResponse = await validarJWT(event);
  // if (unauthResponse) return parseResponse(unauthResponse);

  const response = await controller.actualizar(JSON.parse(event.body), event.pathParameters.id);
  return parseResponse(response);
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar
};
