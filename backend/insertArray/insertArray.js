//funcion para insertar en forma de arreglo
//@param {Array Stringify} formData: son los datos en objeto del formulario
//@param {String} nombreTabla: es el nombre de la tabla a insertar
//@param {String} idBaseDeDatos: es el id de la base de datos para insertar
function insertArray(argumentos) {
  try {
    let [formData, nombreSheet, idBaseDeDatos] = argumentos;

    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreSheet, idBaseDeDatos);
    //data convertida
    let data = JSON.parse(formData);
    //@param [Array] data: es el arreglo de datos a insertar
    let insertar = sheetHoja.appendRow(data);

    //@return {Json Stringify} succes: se retorna success si todo es correcto
    return JSON.stringify("success");
  } catch (error) {
    console.error(error);
    //@return {Json Stringify} error: se retorna success si todo es correcto
    //si hay un error
    return JSON.stringify("error");
  }
}
