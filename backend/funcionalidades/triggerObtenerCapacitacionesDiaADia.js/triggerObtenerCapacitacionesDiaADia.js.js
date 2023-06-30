// //funcion para obtener las capacitaciones del dia a dia en base a la marca temporal etc..
// function triggerObtenerCapacitacionesDiaADia() {
//   const { idDataBase, nameTables } = parametrosGlobales();
//   const { idBaseDeDatosMasterIndicadores, idBaseDeDatosEncuesta } = idDataBase;
//   const { tablaMasterDiario, tablaRespuestasDeFormulario1 } = nameTables;

//   //data de donde se almacenan las respuestas del google form
//   let dataRespuestasDeFormulario1 = readAllArray([
//     tablaRespuestasDeFormulario1,
//     idBaseDeDatosEncuesta,
//   ]);

//   dataRespuestasDeFormulario1 = JSON.parse(dataRespuestasDeFormulario1);

//   //obtener data del master diario
//   let dataMasterDiario = readAllArray([
//     tablaMasterDiario,
//     idBaseDeDatosMasterIndicadores,
//   ]);

//   //recorrer data del master diario

//   dataMasterDiario = JSON.parse(dataMasterDiario);

//   dataMasterDiario.map((el, indice) => {
//     // let categoria = el[1];
//     let programa = el[2];
//     let poblacion = el[3];
//     let fechaInicio = el[13].split("T")[0];

//     let estado = el[15];
//     let estadoEsago = el[26];

//     fechaInicio = limpiarFecha(fechaInicio);

//     // si el estado es planeacio entonces tomar ese registro
//     // filtrar donde la fecha de inicio sea igual al a de la encuesta la poblacion y el programa
//     if (estado == "EN PLANEACIÓN" && estadoEsago != "PROCESADO") {
//       // console.log(el);
//       let filtroDia = dataRespuestasDeFormulario1.filter(
//         (el) =>
//           limpiarFecha(el[0].split("T")[0]) == fechaInicio &&
//           el[5].trim() == poblacion.trim() &&
//           el[6].trim() == programa.trim()
//       );

//       if (filtroDia.length > 0) {
//         //filtro de dia es igual a un arreglo de arreglos [[data,data],[data,data]]

//         console.log(filtroDia);
//         // console.log(filtroDia);
//         let nroAsistentesQueLleganASesion = filtroDia.length;

//         let utilidad = calcularUtilidad(filtroDia);

//         console.log("UTILIDAD" + utilidad);
//         console.log("NRO ASISTENTES" + nroAsistentesQueLleganASesion);

//         utilidad = parseInt(utilidad) / parseInt(nroAsistentesQueLleganASesion);

//         console.log("UTILIDAD DIVISION" + utilidad);

//         let numeroRedondeadoUtilizad = redondearNumero(utilidad);

//         let [cantidadPromotores, cantidadDetratores] = calcularNps(filtroDia);

//         console.log("CANTIDAD DE PROMOTORES" + cantidadPromotores);
//         console.log("CANTIDAD DE DETRATORES" + cantidadDetratores);

//         //actualizar celda T del registro
//         //si encuentra la busqueda entonces
//         let columna = 20;
//         let fila = indice + 2;

//         let columnaEstadoEsago = 27;

//         let columnaUtilizad = 25;

//         let columnaCantidadPromotores = 28;
//         let columnaCantidadDetratores = 29;

//         updateField([
//           tablaMasterDiario,
//           idBaseDeDatosMasterIndicadores,
//           fila,
//           columna,
//           nroAsistentesQueLleganASesion,
//         ]);

//         updateField([
//           tablaMasterDiario,
//           idBaseDeDatosMasterIndicadores,
//           fila,
//           columnaEstadoEsago,
//           "PROCESADO",
//         ]);

//         updateField([
//           tablaMasterDiario,
//           idBaseDeDatosMasterIndicadores,
//           fila,
//           columnaUtilizad,
//           numeroRedondeadoUtilizad,
//         ]);

//         updateField([
//           tablaMasterDiario,
//           idBaseDeDatosMasterIndicadores,
//           fila,
//           columnaCantidadPromotores,
//           cantidadPromotores,
//         ]);

//         updateField([
//           tablaMasterDiario,
//           idBaseDeDatosMasterIndicadores,
//           fila,
//           columnaCantidadDetratores,
//           cantidadDetratores,
//         ]);

//         // let personasQueSeEsperaQueAsistan =
//         //   nroInvitados / nroAsistentesQueLleganASesion;
//       }
//     }
//   });
// }

// //funcion calcular la utilizada
// //@param {Array of Array} filtroDia: es arreglo de arreglo de los registros donde se hace coincidencia
// //del match
// function calcularUtilidad(filtroDia) {
//   let suma = 0;
//   filtroDia.map((el) => {
//     let calificacionColumnaV = el[21];

//     //si el campo es diferente de vacio es decir que tiene un valor entonces sumelo
//     if (calificacionColumnaV != "") {
//       console.log("SUMA" + suma);
//       suma = parseInt(suma) + parseInt(calificacionColumnaV);
//     }
//   });

//   //@return {Int} suma: es la suma del total de la calificacion
//   return suma;
// }

//funcion calcular los nps
//@param {Array of Array} filtroDia: es arreglo de arreglo de los registros donde se hace coincidencia del match
// function calcularNps(filtroDia) {
//   let cantidadPromotores = 0;
//   let cantidadDetratores = 0;
//   filtroDia.map((el) => {
//     let calificacionColumnaW = el[22];
//     //si el campo es diferente de vacio es decir que tiene un valor entonces
//     if (calificacionColumnaW != "") {
//       //obtener cantidad de promotores
//       if (calificacionColumnaW == 10 || calificacionColumnaW == 9) {
//         cantidadPromotores = cantidadPromotores + 1;
//         //obtener cantidad de detratores
//       } else if (calificacionColumnaW >= 1 && calificacionColumnaW <= 6) {
//         cantidadDetratores = cantidadDetratores + 1;
//       }
//     }
//   });

//   //@return {Int} cantidadPromotores: son la cantidad de promotores que calificarion 9 o 10
//   //@return {Int} cantidadDetratores:son la cantidad de detratores que calificacon mayor o igual a 1 y menos o igual de 6
//   return [cantidadPromotores, cantidadDetratores];
// }
