const Joi = require('joi')

const schema = Joi.object({
    Municipio: Joi.string().min(3).max(75).required(),
    CodDepartamento: Joi.number().integer().required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
