//funcion para consultar todo de cualquier base de datos pero en forma de arreglo
//@param {String} nombreTabla: es el nombre de la tabla a consultar
//@param {String} idBaseDeDatos: es el identificador de la base de datos
// function readAll(nombreTabla,idBaseDeDatos){
function readAllArray(argumentos) {
  try {
    let [nombreTabla, idBaseDeDatos] = argumentos;

    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla, idBaseDeDatos);
    //datos de rango de las hojas
    const dataSheetHoja = sheetHoja.getDataRange().getValues();
    //quitar el primer elemento de la hoja de calculo
    dataSheetHoja.shift();

    return JSON.stringify(dataSheetHoja);
  } catch (error) {
    console.error(error);
    //@return "Error en Json"
    return JSON.stringify("error");
  }
}
