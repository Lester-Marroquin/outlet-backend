const Joi = require('joi')

const schema = Joi.object({
    CodDetalleFactura: Joi.number().integer().optional(),
    NumeroFactura: Joi.string().max(45).required(),
    SerieFactura: Joi.string().max(45).required(),
    Cantidad: Joi.number().integer().required(),
    Precio: Joi.number().precision(2).required(),
    CodGarantiaProducto: Joi.number().integer().required(),
    CodProducto: Joi.number().integer().required(),
    CodEstado: Joi.number().integer().required()
})  

const validarDetalle = (data) => {
    const { error } = schema.validate(data)
    return error;
}

module.exports = {
    validarDetalle
}
