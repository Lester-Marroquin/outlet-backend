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
    CodPersona: Joi.number().integer().optional(),
    Nombre: Joi.string().min(2).max(100).required(),
    Apellido: Joi.string().min(2).max(100).required(),
    FechaNacimiento: Joi.string().custom(validarFecha, 'FechaNacimiento').required(),
    Sexo: Joi.valid(0,1).required(), // 0 = mujer | 1 = hombre
    CodTipoIdentificacion: Joi.number().integer().required(),
    NumeroIdentificacion: Joi.string().max(20).required(),
    Telefono: Joi.string().min(8).max(10).required(),
    Correo: Joi.string().email().max(100).required(),
    Direccion: Joi.string().max(500),
    CodMunicipio: Joi.number().integer().required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
