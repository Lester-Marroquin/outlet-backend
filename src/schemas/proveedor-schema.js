const Joi = require('joi')

const schema = Joi.object({
    RazonSocial: Joi.string().max(200),
    NombreComercial: Joi.string().max(200).required(),
    CodEstado: Joi.number().integer()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
