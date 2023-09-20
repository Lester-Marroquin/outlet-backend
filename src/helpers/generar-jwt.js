const jwt = require("jsonwebtoken");

//Nota: generarJWT recibe el UsuarioEmpleado (o UsuarioID) que se esta logeando
const generarJWT = (id = "") => {

  // CADUCIDAD_TOKEN = "1d", en segundos: 86400 segundos en un día (24 horas x 60 minutos x 60 segundos)
  return new Promise((resolve, reject) => {
    const payload = { id }

    jwt.sign(payload, process.env.KEYSECRET, {expiresIn: process.env.CADUCIDAD_TOKEN},
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Error en la generación del Token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
