//parametros globales de los ids
//Implementado por mauricio.araujo@servinformacion.com
function parametrosGlobales() {
  parametros = {
    idGoogleForms: {
      idDiligenciamientoFacilitadorDeGoogleForm:
        "1iCxkEm5qFpSBLi6pTawA__pSzrDknxHwdwm3jxJWJ1w",
    },
    //ids de las base a utilizar
    idDataBase: {
      // idBaseDeDatosEncuesta: "1BI8XJVqte_gGtQQTAtKknNMd0F0bLUHt4YseZzEEUY4", //base copia no original
      idBaseDeDatosEncuesta: "124CgTVdgIP4-5pSgvHdsTUpaCsyO6eamPQSvonLAMI8", //base original
      idBaseDeDatosMasterIndicadores:
        "1D_3zn6OUwwEAOtt6Y9F0ZKydZbRuiAhMRt1HonLzkmE",
    },
    //nombre de las tablas utilizar
    nameTables: {
      tablaRespuestasDeFormulario1: "Respuestas de formulario 1",
      tablaMasterDiario: "MasterDiario",
      tablaMasterMensual: "MasterMensual",
      tablaRespuestasRegistroDecapacitacionesFacilitador:
        "RespuestasRegistroDecapacitacionesFacilitador",
    },
    //nombre de los campos a actualizar
    // nameFieldUpdate: {
    //   nombreCampoActualizarId: "id",
    // },
  };

  return parametros;
}

//conexion a la base de datos
function conexionBaseDeDatos(idBaseDeDatos) {
  //const { idBaseDeDatos } = parametrosGlobales();
  //se abre la conexion de la base de datos
  const BD = SpreadsheetApp.openById(idBaseDeDatos);
  //@return {object} BD: se retorna la base de datos
  return { BD };
}

//asignar nombre
//@param {String} nombreSheet: es el nombre de la hoja de calculo
function asignarNombreHojaDeCalculo(nombreSheet = "", idBaseDeDatos = "") {
  //se obtiene la base de datos
  const { BD } = conexionBaseDeDatos(idBaseDeDatos);
  //se obtiene el nombre de la base de datos
  const sheetHoja = BD.getSheetByName(nombreSheet);
  //@return {Array} sheetHoja: hoja de la base de datos
  return [sheetHoja];
}

//funcion para obtener la primera fila de cada tabla
function obtenerPrimeraRegistroCalculo(nombreSheet, idBaseDeDatos) {
  //obtener la hoja de calculo
  const [sheetHoja] = asignarNombreHojaDeCalculo(nombreSheet, idBaseDeDatos);

  //arreglo de rango de datos
  const dataSheetHoja = sheetHoja.getDataRange().getValues();

  const dataSheetHojaFirstData = dataSheetHoja.shift();

  //@return [Array] dataSheetHojaFirstData: es el arreglo de la primera fila nombres de las columnas
  return [dataSheetHojaFirstData];
}

//ACTUALIZADA 2023
//funcion para ordenar el objeto
//@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
//@param {Object} formData: son los datos del formulario en objeto
function ordenarObjeto(arregloPrimeraFilaBaseDeDatos, formData) {
  let arregloPropiedadesRecibidas = [];

  for (let key in formData) {
    arregloPropiedadesRecibidas.push(key);
  }

  //arreglo de los datos ordenados
  let arregloDatosOrdenados = [];
  arregloPrimeraFilaBaseDeDatos.map((columna) => {
    //buscar la columna en la propiedad del objeto recibido
    let busqueda = arregloPropiedadesRecibidas.find(
      (propiedad) => propiedad.trim() == columna.trim()
    );
    //si la columna se encuentra en la propiedad entonces añadirl los datos al arreglo ordenado
    if (busqueda) {
      arregloDatosOrdenados.push(formData[columna]);
    } else {
      //añadir un espacio vacio
      arregloDatosOrdenados.push("");
    }
  });

  //@return {Array} arregloDatosOrdenados: son los valoreses el objeto del formulario ordenado
  return [arregloDatosOrdenados];
}
