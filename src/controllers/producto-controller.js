const { responseSuccess, responseFail } = require('../helpers/response')
const { validar } = require('../schemas/producto-schema');
const query  = require('../querys/producto-query');
const { StatusCodes } = require('http-status-codes');

const obtenerTodo = async () => {
  try {
    const result = await query.obtenerTodo();
    if(!result){
      return responseFail({message: 'No se encontraron datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result});
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const obtenerUno = async (id) => {
  try {
    const result = await query.obtenerUno(id);
    if (!result) {
      return responseFail({message: 'No se encontraron datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result});
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
}

const obtenerPorCategoria = async (id) => {
  try {
    const result = await query.obtenerPorCategoria(id);
    if (!result) {
      return responseFail({
        message: "No se encontraron datos",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return responseSuccess({ data: result });
  } catch (e) {
    return responseFail({
      message: e,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    });
  }
};  

const crear = async (body) => {
  try {
       
    const validacion = validar(body);
    
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos para crear un Producto', statusCode: StatusCodes.BAD_REQUEST})
    }

    const consulta = await query.consultarExiste(body);
    if (consulta) {
      return responseFail({message: `El producto ya se encuentra creado con el ID: ${consulta.CodProducto}`, statusCode: StatusCodes.CONFLICT})
    }

    const result = await query.crear(body);
    if (!result) {
      return responseFail({message: 'Error en la inserción de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result, message: 'Producto creado exitosamente'});
  
  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

const actualizar = async (body, id) => {
  try {

    const validacion = validar(body);
    if (validacion) {
      return responseFail({data: validacion.details[0].message, message: 'Los datos no son validos', statusCode: StatusCodes.BAD_REQUEST})
    }

    // const consulta = await query.consultarExiste(body);
    // if (consulta) {
    //   return responseFail({message: `El producto ya se encuentra creado con el ID: ${consulta.CodProducto},
    //   Si se esta creando un nuevo producto se debe de cambiar la descripción, pero si se esta agruegando items a un producto existente,
    //   usar la opción de agregar cantidades al producto`, statusCode: StatusCodes.CONFLICT})
    // }

    const result = await query.actualizar(body, id);
    if (!result) {
      return responseFail({message: 'Error en la actualización de datos', statusCode: StatusCodes.NOT_FOUND})
    }
    return responseSuccess({data: result, message: 'Producto actualizado exitosamente'});

  } catch (e) {
    return responseFail({message: e, statusCode: StatusCodes.UNPROCESSABLE_ENTITY})
  }
};

// if (consulta.Precio === body.Precio) {
//   const nuevaCantidad = body.Cantidad + consulta.Cantidad;
//   body.Cantidad = nuevaCantidad;
//   const result = await actualizar(body, consulta.CodProducto);
//   return responseSuccess({data: result, message: `Las unidades se han agregado al producto existente con el ID ${consulta.CodProducto}`});
// }

module.exports = {
  obtenerTodo,
  obtenerUno,
  obtenerPorCategoria,
  crear,
  actualizar
};
