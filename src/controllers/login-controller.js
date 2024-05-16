const { responseSuccess, responseFail } = require('../helpers/response')
const { StatusCodes } = require('http-status-codes');
const query  = require('../querys/login-query');
const { generarJWT } = require("../helpers/generar-jwt");
const bcrypt = require('bcrypt');

const loginEmpleado = async (body) => {
  
  const usuarioEmpleado = body.UsuarioEmpleado;

  const resultEmpleado = await query.obtenerEmpleado(usuarioEmpleado);

    if (!resultEmpleado) {
      return responseFail({message: 'El Empleado no existe', statusCode: StatusCodes.NO_CONTENT})
    }

    if(resultEmpleado.CodEstado == 2){
      return responseFail({data: 'Inactivo',message: 'El Empleado esta inactivo, no puedes acceder al sistema', statusCode: StatusCodes.NO_CONTENT})
    }

    if(resultEmpleado.ClaveEmpleado === ''){
      return responseFail({data: 'ClaveEmpleado', message: 'Debes de generar un clave de acceso', statusCode: StatusCodes.NO_CONTENT})
    }

    // Validar la contraseña
    if (!bcrypt.compareSync(body.ClaveEmpleado, resultEmpleado.ClaveEmpleado)) {
      return responseFail({message: 'La clave no es correcta', statusCode: StatusCodes.BAD_REQUEST})
    }

    // Generar el JWT
    const token = await generarJWT(usuarioEmpleado);
  
    //Destructuración del objeteo resulEmpleado
    //(extraido ClaveEmpleado y el resto de datos se guarda en userEmpleado)
    const { ClaveEmpleado, ...userEmpleado} = resultEmpleado;

    const data = {
      Empleado: userEmpleado,
      token
    }
      return responseSuccess({data: data, message: 'Bienvenido Empleado'});
};

const loginUsuario = async (body) => {
  
  const UsuarioID = body.UsuarioID;

  const resultUsuario = await query.obtenerUsuario(UsuarioID);

    if (!resultUsuario) {
      return responseFail({message: 'El UsuarioID no existe', statusCode: StatusCodes.NO_CONTENT})
    }

    if(resultUsuario.CodEstado == 2){
      return responseFail({data: 'Inactivo', message: 'El Usuario esta inactivo, por favor actualiza tus datos para ser activado', statusCode: StatusCodes.NO_CONTENT})
    }

    // Validar la contraseña
    if (!bcrypt.compareSync(body.ClaveUsuario, resultUsuario.ClaveUsuario)) {
      return responseFail({message: 'La clave no es correcta', statusCode: StatusCodes.BAD_REQUEST})
    }

    // Generar el JWT
    const token = await generarJWT(UsuarioID);
  
    //Destructuración del objeteo resulEmpleado
    //(extraido ClaveEmpleado y el resto de datos se guarda en userEmpleado)
    const { ClaveUsuario, ...userUsuario} = resultUsuario;

    const data = {
      Usuario: userUsuario,
      token
    }
      return responseSuccess({data: data, message: 'Bienvenido Usuario'});

}


module.exports = {
  loginEmpleado,
  loginUsuario
};
