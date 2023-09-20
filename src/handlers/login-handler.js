'use strict';
const { parseResponse } = require('../helpers/response')
const controller = require('../controllers/login-controller');

const loginEmpleado = async (event) => {
  const response = await controller.loginEmpleado(JSON.parse(event.body));
  return parseResponse(response);
};

const loginUsuario = async (event) => {
  const response = await controller.loginUsuario(JSON.parse(event.body));
  return parseResponse(response);
};

module.exports = {
  loginEmpleado,
  loginUsuario
};
