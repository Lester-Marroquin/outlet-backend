const jwt = require("jsonwebtoken");
const { responseSuccess, responseFail } = require('../helpers/response')
const { StatusCodes } = require("http-status-codes");
// const usuarioUseCase = require("../usecases/usuarios-usecase");

const validarJWT = async (event) => {
  let response = null;
  const autorizar = event.headers["authorization"];
  if (!autorizar) {
    return responseFail(
      { message: "No hay token en la petición" },
      StatusCodes.UNAUTHORIZED
    );
  }

  const token = autorizar.split("Bearer ")[1];
  if (!token) {
    response = responseFail(
      { message: "No hay token en la petición" },
      StatusCodes.UNAUTHORIZED
    );
    return response;
  }

  try {
    const { UsuarioEmpleado } = jwt.verify(token, process.env.KEYSECRET);
    // leer el usuario que corresponde al uid

    // Comentar desde acá
    //     const usuario = await usuarioUseCase.findUsuarioActivo(id);
    // if (!usuario) {
    //   return responseFail(
    //     { message: "Token no válido - usuario no existe o está inactivo" },
    //     StatusCodes.UNAUTHORIZED
    //   );
    // }

    ///Validar si el usuario cuenta con el rol para consumir el servicio
  } catch (error) {
    console.error(error);
    return responseFail(
      { message: "Token no válido" },
      StatusCodes.UNAUTHORIZED
    );
  }

};

module.exports = {
  validarJWT,
};
