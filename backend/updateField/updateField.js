//funcion para actualizar cualquier campo de cualquier base de datos pero en array
//funcion para actualizar un registro
//@param {Object Stringify} formData: es el objeto en stringify de los valores a modificar
//@param {String} nombreTabla: es el nombre de la tabla a consultar
//@param {String} idBaseDeDatos: es el id de la base de datos
function updateField(argumentos) {
  try {
    let [nombreTabla, idBaseDeDatos, fila, columna, datoUpdate] = argumentos;
    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla, idBaseDeDatos);

    //@param {Int} fila: posicion fila
    //@param {Int} columna: posicion columna
    //@param {String} datoUpdate: es el dato actualizar en la base de datos
    let rango = sheetHoja.getRange(fila, columna).setValue(datoUpdate);

    return JSON.stringify("success");
  } catch (error) {
    console.error(error);
    //si ocurre algun error retorna error
    return JSON.stringify("error");
  }
}
