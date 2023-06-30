//funcion para obtener el master diario y obtener los acumulados del mes
function triggerObtenerCapacitacionMensualmenteActualizado() {
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
    //   //obtener fecha y mes actual para solo tomar los del mes actual en base a la fecha de inicio
    let codigo = el[0];
    let categoria = el[1];

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

    let vpAtentida = el[17];
    let facilitador = el[21];
    let estadoEsago = el[36];
    let mes = el[39];
    let anio = el[40];
    //contador para ver cuantos registros cumplen dicha condicion y asi dividirlos
    let contador = 0;
    let totalDuracionHoras = 0;
    let totalInvitados = 0;
    let totalPersonasQueAsistieron = 0;
    let totalUtilidad = 0;
    let totalNps = 0;

    //validar que el registro tenga un estado de PROCESADO
    if (estadoEsago == "PROCESADO") {
      console.log(el);

      //si el codigo no esta entonces significa que no se ha procesado el registro
      if (!arregloIdsCodigos.includes(codigo)) {
        //a0ad9d34-2912-4c74-a348-5ba418fd0dce
        //filtrar para obtener los de la misma categoria y programa
        dataMasterDiario.map((elemento) => {
          let codigoElemento = elemento[0];
          let categoriaElemento = elemento[1];

          let programa1Elemento = elemento[2];
          let programa2Elemento = elemento[3];
          let programa3Elemento = elemento[4];
          let programa4Elemento = elemento[5];
          let programa5Elemento = elemento[6];
          let programa6Elemento = elemento[7];
          let programa7Elemento = elemento[8];
          let programa8Elemento = elemento[9];
          let programa9Elemento = elemento[10];
          let programa10Elemento = elemento[11];
          let programa11Elemento = elemento[12];

          //         let programaElemento = elemento[2];
          let vpAtentidaElemento = elemento[17];
          let facilitadorElemento = elemento[21];
          let duracionHoras = elemento[27];
          let invitadosPersonasQueSeEsperaQueAsistan = elemento[28];
          let personasQueAsitieronRellenaronEncuesta = elemento[29];
          let utilidadElemento = elemento[34];
          let estadoEsagoElemento = elemento[36];
          let npsElemento = elemento[35];
          let mesElemento = elemento[39];
          let anioElemento = elemento[40];
          //si la categoria y el programa , vpatendida, facilitador, mes,ani y el estado es igual a "PROCESADO" son iguales al registro entonces agregar al arreglo
          if (
            categoriaElemento == categoria &&
            // programaElemento == programa &&
            programa1Elemento == programa1 &&
            programa2Elemento == programa2 &&
            programa3Elemento == programa3 &&
            programa4Elemento == programa4 &&
            programa5Elemento == programa5 &&
            programa6Elemento == programa6 &&
            programa7Elemento == programa7 &&
            programa8Elemento == programa8 &&
            programa9Elemento == programa9 &&
            programa10Elemento == programa10 &&
            programa11Elemento == programa11 &&
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

          //console.log("DATA" + formData);
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
          let rango = sheetHoja.getRange(fila, 16).setValue(totalDuracionHoras);
          let rango2 = sheetHoja.getRange(fila, 17).setValue(totalInvitados);
          let rango3 = sheetHoja
            .getRange(fila, 18)
            .setValue(totalPersonasQueAsistieron);

          let rango4 = sheetHoja
            .getRange(fila, 23)
            .setValue(totalPorcentajeUtilidad);
          let rango5 = sheetHoja
            .getRange(fila, 24)
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
//@param {String} programa1: es el nombre del programa columna C
//@param {String} programa2: es el nombre del programa columna D
//@param {String} programa3: es el nombre del programa columna E
//@param {String} programa4: es el nombre del programa columna F
//@param {String} programa5: es el nombre del programa columna G
//@param {String} programa6: es el nombre del programa columna H
//@param {String} programa7: es el nombre del programa columna I
//@param {String} programa8: es el nombre del programa columna J
//@param {String} programa9: es el nombre del programa columna K
//@param {String} programa10: es el nombre del programa columna L
//@param {String} programa11: es el nombre del programa columna M
//@param {String} vpAtentida:es el nombre de la vp atendida
//@param {String} facilitador: es el nombre del facilitador
//@param {Int} mes:es el numero del mes
//@param {Int} anio: es el numero del año
//@param {Array array} dataMasterMensual: es el arreglo de la coleccion de elementos de la tabla MasterMensual
function validacionSiYaExisteRegistroMasterMensual(
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
  vpAtentida,
  facilitador,
  mes,
  anio,
  dataMasterMensual
) {
  console.log("DATA MASTER MENSUAL");
  console.log(dataMasterMensual);

  //recorrer la data para obtener la posicion en caso de que exista
  let filtroIndice = dataMasterMensual.findIndex(
    (el) =>
      el[1] == categoria &&
      el[2] == programa1 &&
      el[3] == programa2 &&
      el[4] == programa3 &&
      el[5] == programa4 &&
      el[6] == programa5 &&
      el[7] == programa6 &&
      el[8] == programa7 &&
      el[9] == programa8 &&
      el[10] == programa9 &&
      el[11] == programa10 &&
      el[12] == programa11 &&
      el[13] == vpAtentida &&
      el[14] == facilitador &&
      el[24] == mes &&
      el[25] == anio
  );

  //@return {Int} filtroIndice: es el numero del indice encontrado si lo encuentra retorna el indice en caso de que no retorna -1
  return filtroIndice;
}
