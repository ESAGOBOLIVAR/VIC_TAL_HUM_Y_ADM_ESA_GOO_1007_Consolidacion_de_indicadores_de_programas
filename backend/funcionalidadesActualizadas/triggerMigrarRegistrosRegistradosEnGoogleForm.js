//ejecutar trigger cada hora
//trigger para migrar los registros que se registraron en el google form del facilitador a el master diario
function triggerMigrarRegistrosRegistradosEnGoogleForm() {
  const { idDataBase, nameTables } = parametrosGlobales();
  const { idBaseDeDatosMasterIndicadores, idBaseDeDatosEncuesta } = idDataBase;
  const {
    tablaRespuestasRegistroDecapacitacionesFacilitador,
    tablaMasterDiario,
  } = nameTables;

  //data de donde se almacenan las respuestas del google form del facilitador capacitacion
  let dataRespuestasRegistroDecapacitacionesFacilitador = readAllArray([
    tablaRespuestasRegistroDecapacitacionesFacilitador,
    idBaseDeDatosMasterIndicadores,
  ]);

  //convertir la data
  dataRespuestasRegistroDecapacitacionesFacilitador = JSON.parse(
    dataRespuestasRegistroDecapacitacionesFacilitador
  );

  //   console.log(dataRespuestasRegistroDecapacitacionesFacilitador);

  //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
  const [sheetHoja] = asignarNombreHojaDeCalculo(
    tablaRespuestasRegistroDecapacitacionesFacilitador,
    idBaseDeDatosMasterIndicadores
  );

  dataRespuestasRegistroDecapacitacionesFacilitador.map((el, index) => {
    let estado = el[28];
    //si el estado es diferente de migrado tomar el registro
    if (estado != "MIGRADO") {
      let indice = index + 2;
      console.log("INDICEEEE" + indice);
      let categoria = el[1];
      let objetivo = el[2];
      let observaciones = el[3];
      let liderPrograma = el[4];
      let vpAtendida = el[5];
      let clienteQueSolicita = el[6];
      let segmentoTipoDePoblacion = el[7];
      let detallePoblacionObjetivo = el[8];
      let facilitador = el[9];
      let modalidad = el[10];
      let fechaInicio = el[11];
      let fechaFinal = el[12];
      let servicio = el[13];
      let duracionHoras = el[14];
      let invitadorQueSeEsperaQueAsistan = el[15];
      let poblacion = el[16];
      let programa1 = el[17];
      let programa2 = el[18];
      let programa3 = el[19];
      let programa4 = el[20];
      let programa5 = el[21];
      let programa6 = el[22];
      let programa7 = el[23];
      let programa8 = el[24];
      let programa9 = el[25];
      let programa10 = el[26];
      let programa11 = el[27];

      //convertir las fechas
      let [anioFechaInicio, mesFechaInicio, diaFechaInicio] =
        fechaInicio.split("-");
      let [anioFechaFinal, mesFechaFinal, diaFechaFinal] =
        fechaFinal.split("-");

      diaFechaInicio = diaFechaInicio.split("T")[0];
      diaFechaFinal = diaFechaFinal.split("T")[0];

      let fechaInicioConvertida = `${diaFechaInicio}/${mesFechaInicio}/${anioFechaInicio}`;
      let fechaFinalConvertida = `${diaFechaFinal}/${mesFechaFinal}/${anioFechaFinal}`;

      let idUnico = Utilities.getUuid();

      let datos = [
        idUnico,
        categoria,
        programa1,
        programa2,
        programa3,
        programa4,
        programa5,
        programa6,
        programa7,
        programa8,
        programa9,
        programa10,
        programa11,
        poblacion,
        objetivo,
        observaciones,
        liderPrograma,
        vpAtendida,
        clienteQueSolicita,
        segmentoTipoDePoblacion,
        detallePoblacionObjetivo,
        facilitador,
        modalidad,
        fechaInicioConvertida,
        fechaFinalConvertida,
        "EN PLANEACIÓN",
        servicio,
        duracionHoras,
        invitadorQueSeEsperaQueAsistan,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        mesFechaInicio,
        anioFechaInicio,
      ];

      //insertar en la base de datos MÁSTER Diario
      let insertar = insertArray([
        JSON.stringify(datos),
        tablaMasterDiario,
        idBaseDeDatosMasterIndicadores,
      ]);

      //si la respuesta es success actualizar
      insertar = JSON.parse(insertar);

      //si la repuesta es success entonces actualizar la fila del registro que se migro al master diario
      if (insertar == "success") {
        revisarUso(
          [idBaseDeDatosMasterIndicadores, idBaseDeDatosEncuesta],
          "VIC_TAL_HUM_Y_ADM_ESA_GOO_1007",
          "Sin comentarios"
        );
        //actualizar en base al indice el registro a un estado de MIGRADO
        //@param {Int} fila: posicion fila
        //@param {Int} columna: posicion columna
        //@param {String} datoUpdate: es el dato actualizar en la base de datos
        let rango = sheetHoja.getRange(indice, 29).setValue("MIGRADO");
      }
    }
  });
}
