//funcion para limpiar una fecha se recibe en formato AÑO-MES-DIA y el dia o mes si es  <9 lo convierte en 09
//@param {String} es la fecha en string en formato año mes dia
function limpiarFecha(fecha) {
  //funcionalidad
  let [anio, mes, dia] = fecha.split("-");

  if (dia.startsWith("0")) {
    dia = dia.substring(1);
  }

  if (parseInt(dia) <= 9) {
    dia = "0" + dia;
  }

  if (mes.startsWith("0")) {
    mes = mes.substring(1);
  }

  if (parseInt(mes) <= 9) {
    mes = "0" + mes;
  }

  let fechaConvertida = `${anio}-${mes}-${dia}`;

  //@return {String} fechaConvertida: es la fecha convertida en formato string se devuelve en AÑO-MES-DIA
  return fechaConvertida;
}
