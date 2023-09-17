const Joi = require('joi')

const schema = Joi.object({
    ImagenUrl: Joi.string().max(300).required(),
    CodProducto: Joi.number().integer().required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
