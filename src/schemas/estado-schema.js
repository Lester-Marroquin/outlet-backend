const Joi = require('joi')

const schema = Joi.object({
    Estado: Joi.string().min(3).max(50).required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
