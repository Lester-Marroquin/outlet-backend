const Joi = require('joi')

const schema = Joi.object({
    CategoriaProducto: Joi.string().min(3).max(100).required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
