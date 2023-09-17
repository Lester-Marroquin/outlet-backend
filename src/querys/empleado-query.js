const { db } = require('../config/connection');

const nombreTabla1 = 'Empleado';
const nombreTabla2 = 'Persona';
const nombreTabla3 = 'Cargo';
const nombreTabla4 = 'Rol';
const nombreTabla5 = 'DetalleRol';

const obtenerTodo = async () => {
  try {
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .join(nombreTabla3, `${nombreTabla1}.CodCargo`, '=', `${nombreTabla3}.CodCargo`)
  } catch (e) {
    throw e;
  }
};

const obtenerUno = async (id) => {
  try {
    const Empleado = await db(nombreTabla1)
    .select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .join(nombreTabla3, `${nombreTabla1}.CodCargo`, '=', `${nombreTabla3}.CodCargo`)
    .join(nombreTabla4, `${nombreTabla1}.CodRol`, '=', `${nombreTabla4}.CodRol`)
    .where('CodEmpleado', id).first()

    const DetalleRol = await db.select().table(nombreTabla5).where('CodRol', Empleado.CodRol)

    return data = {Empleado, DetalleRol}

  } catch (e) {
    throw e;
  }
};

const crear = async (data) => {
  try {
    const result = await db(nombreTabla1).insert(data);
    return await db(nombreTabla1).select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .where('CodEmpleado', result[0]).first();
  } catch (e) {
    throw e;
  }
};

const actualizar = async (data, id) => {
  try {
    
    await db(nombreTabla1).where('CodEmpleado', id).update(data);
    return await db.select()
    .join(nombreTabla2, `${nombreTabla1}.CodPersona`, '=', `${nombreTabla2}.CodPersona`)
    .where('CodEmpleado', id).table(nombreTabla1).first()
  } catch (e) {
    throw e;
  }
};

module.exports = {
  obtenerTodo,
  obtenerUno,
  crear,
  actualizar
};
