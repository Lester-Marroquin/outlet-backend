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
    CodPersona: Joi.number().integer().required(),
    CodProducto: Joi.number().integer().required(),
    TipoServicio: Joi.string().valid('Mantenimiento', 'Reparación').required(),
    DescripcionProblema: Joi.string().required(),
    FechaSolicitud: Joi.string().custom(validarFecha, 'FechaSolicitud').required(),
    FechaFinSolicitud: Joi.string().custom(validarFecha, 'FechaFinSolicitud').optional(),
    CodEstado: Joi.number().integer().required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
