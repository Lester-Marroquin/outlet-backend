const Joi = require('joi')

const schema = Joi.object({
    CodRol: Joi.number().integer().required(),
    Leer: Joi.valid(0,1).required(), // 0 =  no | 1 = si
    Escritura: Joi.valid(0,1).required(), // 0 =  no | 1 = si
    Borrar: Joi.valid(0,1).required(), // 0 =  no | 1 = si
    Modulo: Joi.string().min(3).max(100).required()
    
})

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
