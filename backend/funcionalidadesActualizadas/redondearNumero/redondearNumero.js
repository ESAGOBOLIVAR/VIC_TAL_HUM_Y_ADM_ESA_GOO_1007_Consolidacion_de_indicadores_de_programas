//funcion para redondear los numeros aquel que tenga .5 lo redondea a su numero siguiente
//si es .4 lo redondea al numero menor
//@param {Int} numero: es el numero a redondear
function redondearNumero(numero) {
    if (numero >= 1.5) {
      return Math.round(numero);
    } else {
      return 1;
    }
  }