"use strict";
const { parseResponse } = require("../helpers/response");
const controller = require("../controllers/cargo-controller");
const { validarJWT } = require("../helpers/validar-jwt");

const obtenerTodo = async (event) => {
  // const unAuth = await validarJWT(event);
  // if (unAuth) return parseResponse(unAuth);
  const response = await controller.obtenerTodo();
  return parseResponse(response);
};

const obtenerUno = async (event) => {
  // const unAuth = await validarJWT(event);
  // if (unAuth) return parseResponse(unAuth);
  const response = await controller.obtenerUno(event.pathParameters.id);
  return parseResponse(response);
};

const crear = async (event) => {
  // const unAuth = await validarJWT(event);
  // if (unAuth) return parseResponse(unAuth);
  const response = await controller.crear(JSON.parse(event.body));
  return parseResponse(response);
};

const actualizar = async (event) => {
  // const unAuth = await validarJWT(event);
  // if (unAuth) return parseResponse(unAuth);
  const response = await controller.actualizar(
    JSON.parse(event.body),
    event.pathParameters.id
  );
  return parseResponse(response);
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar,
};
