const Joi = require('joi')
const validarFecha = (value, helpers) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(value)) {
        return helpers.error('string.pattern.base', {value});
    }

    const date = value.split('-');
    const year = parseInt(date[0]);
    const month = parseInt(date[1]);
    const day = parseInt(date[2]);
  
    const yearActual = new Date().getFullYear();
    const yearMinimo = yearActual - 100;

    if (year < yearMinimo || year > yearActual || month < 1 || month > 12 || day < 1 || day > 31) {
      return helpers.error('any.invalid');
    }
    
    return value;
}

const schema = Joi.object({
    UsuarioID: Joi.string().required(),
    ClaveUsuario: Joi.string().max(128).required(),
    CodPersona: Joi.number().integer().required(),
    CodRol: Joi.number().integer().required(),
    FechaRegistro: Joi.string().custom(validarFecha, 'FechaNacimiento').required(),
    FechaBaja: Joi.string().custom(validarFecha, 'FechaBaja').allow(null, ''),
    CodEstado: Joi.number().integer().required()
})

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
