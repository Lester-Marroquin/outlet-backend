const Joi = require('joi')
const validarFecha = (value, helpers) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(value)) {
        return helpers.error('string.pattern.base', {value});
    }

    const date = value.split("-");
    const year = parseInt(date[0]);
    const month = parseInt(date[1]);
    const day = parseInt(date[2]);
  
    const yearActual = new Date().getFullYear();
    const yearMinimo = yearActual - 100;

    if (year < yearMinimo || year > yearActual || month < 1 || month > 12 || day < 1 || day > 31) {
      return helpers.error("any.invalid");
    }
    
    return value;
}

const schema = Joi.object({
    Nombre: Joi.string().min(2).max(100).required(),
    Apellido: Joi.string().min(2).max(100).required(),
    FechaNacimiento: Joi.string().custom(validarFecha, "FechaNacimiento").required(),
    Sexo: Joi.valid(0,1).required(), // 0 = mujer | 1 = hombre
    CodTipoDocumento: Joi.number().integer().allow(null),
    NumeroDocumento: Joi.string().allow(null),
    Direccion: Joi.string().max(500),
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
