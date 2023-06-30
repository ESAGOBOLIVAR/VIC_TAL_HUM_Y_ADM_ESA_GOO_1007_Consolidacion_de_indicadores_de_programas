//trigger para diligenciamiento de google form facilitador
//cada vez que se rellene el google form se comenzara alimentar la base de datos
function triggerDiligenciamientoFacilitadorDeGoogleForm(e) {
  //obtener las respuestas
  const respuestaEnviada = e.response;
  //obtener item de las respuestas en array
  const respuestas = respuestaEnviada.getItemResponses();

  //obtener datos google form
  const categoria = respuestas[0].getResponse().trim();
  const programa = respuestas[1].getResponse().trim();
  const poblacion = respuestas[2].getResponse().trim();
  const objetivo = respuestas[3].getResponse().trim();
  const observaciones = respuestas[4].getResponse().trim();
  const liderPrograma = respuestas[5].getResponse().trim();
  const vpAtentidaClienteQueSolicita = respuestas[6].getResponse().trim();
  const clienteQueSolicita = respuestas[7].getResponse().trim();
  const tipoDePoblacion = respuestas[8].getResponse().trim();
  const detallePoblacion = respuestas[9].getResponse().trim();
  const facilitador = respuestas[10].getResponse().trim();
  const modalidad = respuestas[11].getResponse().trim();
  const fechaInicio = respuestas[12].getResponse().trim();
  const fechaFinal = respuestas[13].getResponse().trim();
  const servicio = respuestas[14].getResponse().trim();
  const duracionHoras = respuestas[15].getResponse().trim();
  const invitados = respuestas[16].getResponse().trim();

  const estado = "EN PLANEACIÓN";

  //convertir las fechas
  let [anioFechaInicio, mesFechaInicio, diaFechaInicio] =
    fechaInicio.split("-");
  let [anioFechaFinal, mesFechaFinal, diaFechaFinal] = fechaFinal.split("-");

  let fechaInicioConvertida = `${diaFechaInicio}/${mesFechaInicio}/${anioFechaInicio}`;
  let fechaFinalConvertida = `${diaFechaFinal}/${mesFechaFinal}/${anioFechaFinal}`;

  let idUnico = Utilities.getUuid();
  let data = [
    idUnico,
    categoria,
    programa,
    poblacion,
    objetivo,
    observaciones,
    liderPrograma,
    vpAtentidaClienteQueSolicita,
    clienteQueSolicita,
    tipoDePoblacion,
    detallePoblacion,
    facilitador,
    modalidad,
    fechaInicioConvertida,
    fechaFinalConvertida,
    estado,
    servicio,
    duracionHoras,
    invitados,
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

  console.log("DATA");
  console.log(data);

  const { idDataBase } = parametrosGlobales();
  const { idBaseDeDatosMasterIndicadores } = idDataBase;
  //insertar en la base de datos MÁSTER Diario
  insertArray([
    JSON.stringify(data),
    "MasterDiario",
    idBaseDeDatosMasterIndicadores,
  ]);
}

//funcion para crear el trigger para enviar el formulario (ejecutar una sola vez)
function crearTriggerFormularioDiligenciamientoFacilitador() {
  const { idGoogleForms } = parametrosGlobales();
  const { idDiligenciamientoFacilitadorDeGoogleForm } = idGoogleForms;
  let form = FormApp.openById(idDiligenciamientoFacilitadorDeGoogleForm);
  //nombre de la funcion para crear el nuevo trigger
  ScriptApp.newTrigger("triggerDiligenciamientoFacilitadorDeGoogleForm")
    .forForm(form)
    .onFormSubmit()
    .create();
}
