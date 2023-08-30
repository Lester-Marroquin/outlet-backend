const jwt = require("jsonwebtoken");
const { responseFail } = require("../helpers/responses");
const { StatusCodes } = require("http-status-codes");
const usuarioUseCase = require("../usecases/usuarios-usecase");

const validarJWT = async (event) => {
  let response = null;
  const autorizar = event.headers["autorizar"];
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
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // leer el usuario que corresponde al uid
    const usuario = await usuarioUseCase.findUsuarioActivo(id);
    if (!usuario) {
      return responseFail(
        { message: "Token no válido - usuario no existe o está inactivo" },
        StatusCodes.UNAUTHORIZED
      );
    }

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
