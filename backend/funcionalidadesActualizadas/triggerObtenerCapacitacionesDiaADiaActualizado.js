//funcion para obtener las capacitaciones del dia a dia en base a la marca temporal etc..
function triggerObtenerCapacitacionesDiaADiaActualizado() {
  const { idDataBase, nameTables } = parametrosGlobales();
  const { idBaseDeDatosMasterIndicadores, idBaseDeDatosEncuesta } = idDataBase;
  const { tablaMasterDiario, tablaRespuestasDeFormulario1 } = nameTables;

  //data de donde se almacenan las respuestas del google form de la base encuesta del usuario
  let dataRespuestasDeFormulario1 = readAllArray([
    tablaRespuestasDeFormulario1,
    idBaseDeDatosEncuesta,
  ]);

  dataRespuestasDeFormulario1 = JSON.parse(dataRespuestasDeFormulario1);

  //obtener data del master diario
  let dataMasterDiario = readAllArray([
    tablaMasterDiario,
    idBaseDeDatosMasterIndicadores,
  ]);

  //recorrer data del master diario

  dataMasterDiario = JSON.parse(dataMasterDiario);

  dataMasterDiario.map((el, indice) => {
    // let categoria = el[1];
    let programa1 = el[2];
    let programa2 = el[3];
    let programa3 = el[4];
    let programa4 = el[5];
    let programa5 = el[6];
    let programa6 = el[7];
    let programa7 = el[8];
    let programa8 = el[9];
    let programa9 = el[10];
    let programa10 = el[11];
    let programa11 = el[12];
    //poblacion
    let poblacion = el[13];

    let estado = el[25];

    let estadoEsago = el[36];

    //  si el estado es planeacio entonces tomar ese registro
    // filtrar donde la fecha de inicio sea igual al a de la encuesta la poblacion y a los programas
    if (estado == "EN PLANEACIÓN" && estadoEsago != "PROCESADO") {
      //año-mes-dia
      let fechaInicio = el[23].split("T")[0];
      console.log("fechaInicio...." + el[23]);

      console.log("FECHA DE INICIO EXTRAIDO CON SPLIT" + fechaInicio);

      fechaInicio = limpiarFecha(fechaInicio);
      console.log("FECHA DE INICIO" + fechaInicio);
      let filtroDia = dataRespuestasDeFormulario1.filter(
        (el) =>
          limpiarFecha(el[0].split("T")[0]) == fechaInicio &&
          convertirPalabraAMayuscula(el[5]) ==
            convertirPalabraAMayuscula(poblacion) &&
          convertirPalabraAMayuscula(el[6]) ==
            convertirPalabraAMayuscula(programa1) &&
          convertirPalabraAMayuscula(el[7]) ==
            convertirPalabraAMayuscula(programa2) &&
          convertirPalabraAMayuscula(el[8]) ==
            convertirPalabraAMayuscula(programa3) &&
          convertirPalabraAMayuscula(el[9]) ==
            convertirPalabraAMayuscula(programa4) &&
          convertirPalabraAMayuscula(el[10]) ==
            convertirPalabraAMayuscula(programa5) &&
          convertirPalabraAMayuscula(el[11]) ==
            convertirPalabraAMayuscula(programa6) &&
          convertirPalabraAMayuscula(el[12]) ==
            convertirPalabraAMayuscula(programa7) &&
          convertirPalabraAMayuscula(el[13]) ==
            convertirPalabraAMayuscula(programa8) &&
          convertirPalabraAMayuscula(el[14]) ==
            convertirPalabraAMayuscula(programa9) &&
          convertirPalabraAMayuscula(el[15]) ==
            convertirPalabraAMayuscula(programa10) &&
          convertirPalabraAMayuscula(el[16]) ==
            convertirPalabraAMayuscula(programa11)
      );

      if (filtroDia.length > 0) {
        //     //filtro de dia es igual a un arreglo de arreglos [[data,data],[data,data]]
        console.log(filtroDia);
        // console.log(filtroDia);
        let nroAsistentesQueLleganASesion = filtroDia.length;
        let utilidad = calcularUtilidad(filtroDia);
        console.log("UTILIDAD" + utilidad);
        console.log("NRO ASISTENTES" + nroAsistentesQueLleganASesion);
        utilidad = parseInt(utilidad) / parseInt(nroAsistentesQueLleganASesion);
        console.log("UTILIDAD DIVISION" + utilidad);
        let numeroRedondeadoUtilizad = redondearNumero(utilidad);
        let [cantidadPromotores, cantidadDetratores] = calcularNps(filtroDia);
        console.log("CANTIDAD DE PROMOTORES" + cantidadPromotores);
        console.log("CANTIDAD DE DETRATORES" + cantidadDetratores);
        //actualizar celda T del registro
        //si encuentra la busqueda entonces
        let columnaNroAsistentesQueAsisten = 30;
        let fila = indice + 2;
        let columnaEstadoEsago = 37;
        let columnaUtilizad = 35;
        let columnaCantidadPromotores = 38;
        let columnaCantidadDetratores = 39;
        updateField([
          tablaMasterDiario,
          idBaseDeDatosMasterIndicadores,
          fila,
          columnaNroAsistentesQueAsisten,
          nroAsistentesQueLleganASesion,
        ]);

        updateField([
          tablaMasterDiario,
          idBaseDeDatosMasterIndicadores,
          fila,
          columnaEstadoEsago,
          "PROCESADO",
        ]);

        updateField([
          tablaMasterDiario,
          idBaseDeDatosMasterIndicadores,
          fila,
          columnaUtilizad,
          numeroRedondeadoUtilizad,
        ]);

        updateField([
          tablaMasterDiario,
          idBaseDeDatosMasterIndicadores,
          fila,
          columnaCantidadPromotores,
          cantidadPromotores,
        ]);

        updateField([
          tablaMasterDiario,
          idBaseDeDatosMasterIndicadores,
          fila,
          columnaCantidadDetratores,
          cantidadDetratores,
        ]);
      }
    }
  });
}

//funcion calcular la utilizada
//@param {Array of Array} filtroDia: es arreglo de arreglo de los registros donde se hace coincidencia
//del match
function calcularUtilidad(filtroDia) {
  let suma = 0;
  filtroDia.map((el) => {
    let calificacionColumnaAB = el[27];

    //si el campo es diferente de vacio es decir que tiene un valor entonces sumelo
    if (calificacionColumnaAB != "") {
      console.log("SUMA" + suma);
      suma = parseInt(suma) + parseInt(calificacionColumnaAB);
    }
  });

  //@return {Int} suma: es la suma del total de la calificacion
  return suma;
}

//funcion calcular los nps
//@param {Array of Array} filtroDia: es arreglo de arreglo de los registros donde se hace coincidencia del match
function calcularNps(filtroDia) {
  let cantidadPromotores = 0;
  let cantidadDetratores = 0;
  filtroDia.map((el) => {
    let calificacionColumnaAC = el[28];
    //si el campo es diferente de vacio es decir que tiene un valor entonces
    if (calificacionColumnaAC != "") {
      //obtener cantidad de promotores
      if (calificacionColumnaAC == 10 || calificacionColumnaAC == 9) {
        cantidadPromotores = cantidadPromotores + 1;
        //obtener cantidad de detratores
      } else if (calificacionColumnaAC >= 1 && calificacionColumnaAC <= 6) {
        cantidadDetratores = cantidadDetratores + 1;
      }
    }
  });

  //@return {Int} cantidadPromotores: son la cantidad de promotores que calificarion 9 o 10
  //@return {Int} cantidadDetratores:son la cantidad de detratores que calificacon mayor o igual a 1 y menos o igual de 6
  return [cantidadPromotores, cantidadDetratores];
}
