const Joi = require('joi')

const schema = Joi.object({
    NombreSucursal: Joi.string().min(3).max(100).required(),
    DireccionSucursal: Joi.string().max(100).required(),
    CodMunicipio: Joi.number().integer()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
