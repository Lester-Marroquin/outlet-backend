const Joi = require('joi')

const schema = Joi.object({
    MarcaProducto: Joi.string().min(2).max(100).required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
