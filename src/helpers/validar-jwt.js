const jwt = require("jsonwebtoken");
const { responseFail } = require("../helpers/response");
const { StatusCodes } = require("http-status-codes");
// const usuarioUseCase = require("../usecases/usuarios-usecase");

const validarJWT = async (event) => {
  try {
    const autorizar = event.headers["Authorization"];
    if (!autorizar) {
      return responseFail({
        message: "Error en los Headers de la petición",
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    const token = autorizar.split("Bearer ")[1];

    if (!token) {
      return responseFail({
        message: "No hay token en la petición",
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    const { id } = jwt.verify(token, process.env.KEYSECRET);
    
  } catch (e) {
    return responseFail({
      data: e,
      message: "Token no valido",
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  }
};

module.exports = {
  validarJWT,
};
