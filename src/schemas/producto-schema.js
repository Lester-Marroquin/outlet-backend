const Joi = require('joi')

const schema = Joi.object({
    CodCategoriaProducto: Joi.number().integer().required(),
    Producto: Joi.string().min(3).max(200).required(),
    Cantidad: Joi.number().integer().required(),
    Precio: Joi.number().precision(2).min(0).required(),
    Imagen: Joi.string().max(300).required(),
    Color: Joi.string().max(50).required(),
    CodMarcaProducto: Joi.number().integer().required(),
    Observaciones: Joi.string().max(300).allow(''),
    CodEstado: Joi.number().integer().required(),
    Tipo: Joi.string().valid('Servicio', 'Producto'),
    CodProveedor: Joi.number().integer().required(),
})  

const validar = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validar
}
