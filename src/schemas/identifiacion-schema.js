const Joi = require('joi')

const schema = Joi.object({
    TipoIdetificacion: Joi.string().max(10).required()
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
