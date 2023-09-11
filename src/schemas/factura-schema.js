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
    NumeroFactura: Joi.string().max(45).required(),
    SerieFactura: Joi.string().max(45).required(),
    CodEmpleado: Joi.number().integer().required(),
    CodPersona: Joi.number().integer().required(),
    CodSucursal: Joi.number().integer().required(),
    FechaEmision: Joi.string().custom(validarFecha, 'FechaEmision').required(),
    FechaAnulacion: Joi.string().custom(validarFecha, 'FechaAnulacion').required(),
    ComentarioAnulacion: Joi.string().max(300).allow(''),
    TotalFactura: Joi.number().precision(1).required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
