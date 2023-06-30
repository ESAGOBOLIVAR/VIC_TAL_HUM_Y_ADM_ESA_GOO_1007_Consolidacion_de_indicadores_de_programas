//funcion para obtener el master diario y obtener los acumulados del mes
function triggerObtenerCapacitacionMensualmente() {
  const { idDataBase, nameTables } = parametrosGlobales();
  const { idBaseDeDatosMasterIndicadores } = idDataBase;
  const { tablaMasterDiario, tablaMasterMensual } = nameTables;

  //obtener data del master diario
  let dataMasterDiario = readAllArray([
    tablaMasterDiario,
    idBaseDeDatosMasterIndicadores,
  ]);

  //recorrer data del master diario
  dataMasterDiario = JSON.parse(dataMasterDiario);

  let dataMasterMensual = readAllArray([
    tablaMasterMensual,
    idBaseDeDatosMasterIndicadores,
  ]);

  dataMasterMensual = JSON.parse(dataMasterMensual);

  //abrir la hoja 1 vez
  const [sheetHoja] = asignarNombreHojaDeCalculo(
    tablaMasterMensual,
    idBaseDeDatosMasterIndicadores
  );

  //arreglo donde se almacenan los ids que ya se procesaron
  let arregloIdsCodigos = [];
  dataMasterDiario.map((el) => {
    //obtener fecha y mes actual para solo tomar los del mes actual en base a la fecha de inicio
    let codigo = el[0];
    let categoria = el[1];
    let programa = el[2];
    let vpAtentida = el[7];
    let facilitador = el[11];
    let estadoEsago = el[26];
    let mes = el[29];
    let anio = el[30];

    //contador para ver cuantos registros cumplen dicha condicion y asi dividirlos
    let contador = 0;
    let totalDuracionHoras = 0;
    let totalInvitados = 0;
    let totalPersonasQueAsistieron = 0;
    let totalUtilidad = 0;
    let totalNps = 0;

    //validar que el registro tenga un estado de PROCESADO
    if (estadoEsago == "PROCESADO") {
      //si el codigo no esta entonces significa que no se ha procesado el registro
      if (!arregloIdsCodigos.includes(codigo)) {
        //a0ad9d34-2912-4c74-a348-5ba418fd0dce
        //filtrar para obtener los de la misma categoria y programa
        dataMasterDiario.map((elemento) => {
          let codigoElemento = elemento[0];
          let categoriaElemento = elemento[1];
          let programaElemento = elemento[2];
          let vpAtentidaElemento = elemento[7];
          let facilitadorElemento = elemento[11];
          let duracionHoras = elemento[17];
          let invitadosPersonasQueSeEsperaQueAsistan = elemento[18];
          let personasQueAsitieronRellenaronEncuesta = elemento[19];
          let utilidadElemento = elemento[24];
          let estadoEsagoElemento = elemento[26];
          let npsElemento = elemento[25];
          let mesElemento = elemento[29];
          let anioElemento = elemento[30];
          //si la categoria y el programa , vpatendida, facilitador, mes,ani y el estado es igual a "PROCESADO" son iguales al registro entonces agregar al arreglo
          if (
            categoriaElemento == categoria &&
            programaElemento == programa &&
            vpAtentidaElemento == vpAtentida &&
            facilitadorElemento == facilitador &&
            mesElemento == mes &&
            anioElemento == anio &&
            estadoEsagoElemento == "PROCESADO"
          ) {
            arregloIdsCodigos.push(codigoElemento);

            //sumar las horas totales
            totalDuracionHoras = totalDuracionHoras + duracionHoras;

            //sumar el numero de invitados
            totalInvitados =
              totalInvitados + invitadosPersonasQueSeEsperaQueAsistan;

            //sumar personas que rellenaron la encuesta
            totalPersonasQueAsistieron =
              totalPersonasQueAsistieron +
              personasQueAsitieronRellenaronEncuesta;

            //suma del total de utilidad
            totalUtilidad = totalUtilidad + utilidadElemento;

            //suma del total de nps
            totalNps = npsElemento + totalNps;
            console.log("TOTAL DE NPS" + totalNps);

            contador += 1;
          }
        });

        let totalPorcentajeUtilidad = totalUtilidad / contador;

        let totalNpsPorcentaje = totalNps / contador;

        console.log("TOTAL PORCENTAJE UTILIDAD" + totalPorcentajeUtilidad);
        console.log("TOTAL NPS PORCENTAJE" + totalNpsPorcentaje);

        // totalPorcentajeUtilidad = redondearNumero(totalPorcentajeUtilidad);

        //se debe de verificar que no exista en la base master y en caso que exista sobree escribir y en caso de que no sumar y hacer los calculos

        let indiceEncontrado = validacionSiYaExisteRegistroMasterMensual(
          categoria,
          programa,
          vpAtentida,
          facilitador,
          mes,
          anio,
          dataMasterMensual
        );

        //si el indice encontrado es menos 1 significa que no existe entonces insertarlo
        if (indiceEncontrado == -1) {
          //verificacion de que no exista
          //si existe entonces reemplazar la fila con los resultados

          let formData = JSON.stringify([
            ,
            categoria,
            programa,
            vpAtentida,
            facilitador,
            totalDuracionHoras,
            totalInvitados,
            totalPersonasQueAsistieron,
            ,
            ,
            ,
            ,
            totalPorcentajeUtilidad,
            totalNpsPorcentaje,
            mes,
            anio,
          ]);

          console.log("DATA" + formData);

          //data convertida
          let data = JSON.parse(formData);
          //@param [Array] data: es el arreglo de datos a insertar
          let insertar = sheetHoja.appendRow(data);
        } else {
          console.log("ENTRE EN EL ELSE");

          //en caso contrario actualizar los valores
          let fila = indiceEncontrado + 2;

          //actualizar campos
          //@param {Int} fila: posicion fila
          //@param {Int} columna: posicion columna
          //@param {String} dato: es el dato actualizar en la base de datos
          let rango = sheetHoja.getRange(fila, 6).setValue(totalDuracionHoras);

          let rango2 = sheetHoja.getRange(fila, 7).setValue(totalInvitados);

          let rango3 = sheetHoja
            .getRange(fila, 8)
            .setValue(totalPersonasQueAsistieron);

          let rango4 = sheetHoja
            .getRange(fila, 13)
            .setValue(totalPorcentajeUtilidad);

          let rango5 = sheetHoja
            .getRange(fila, 14)
            .setValue(totalNpsPorcentaje);
        }
      }
    }
  });
  console.log("ARREGLO IDS CODIGOS");
  console.log(arregloIdsCodigos);
}

//funcion para verificar si el registro ya existe en el master mensual de esta manera no ingresarlo si no actualizar sus valores
//@param {String} categoria: es el nombre de la categoria
//@param {String} programa: es el nombre del programa
//@param {String} vpAtentida:es el nombre de la vp atendida
//@param {String} facilitador: es el nombre del facilitador
//@param {Int} mes:es el numero del mes
//@param {Int} anio: es el numero del año
//@param {Array array} dataMasterMensual: es el arreglo de la coleccion de elementos de la tabla MasterMensual
// function validacionSiYaExisteRegistroMasterMensual(
//   categoria,
//   programa,
//   vpAtentida,
//   facilitador,
//   mes,
//   anio,
//   dataMasterMensual
// ) {
//   console.log("DATA MASTER MENSUAL");
//   console.log(dataMasterMensual);

//   //recorrer la data para obtener la posicion en caso de que exista
//   let filtroIndice = dataMasterMensual.findIndex(
//     (el) =>
//       el[1] == categoria &&
//       el[2] == programa &&
//       el[3] == vpAtentida &&
//       el[4] == facilitador &&
//       el[14] == mes &&
//       el[15] == anio
//   );

//   //@return {Int} filtroIndice: es el numero del indice encontrado si lo encuentra retorna el indice en caso de que no retorna -1
//   return filtroIndice;
// }


