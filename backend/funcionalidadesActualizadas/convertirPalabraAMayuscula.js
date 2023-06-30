//funcion para convertir una palabra en mayusculas y quitar las tildes y quitar los espacios de los lados
//@param {String} palabra:es la palabra convertida en mayusculas
function convertirPalabraAMayuscula(palabra) {
    // Convertir a mayúsculas
    const palabraMayusculas = palabra.toUpperCase();
  
    // Quitar tildes
    const palabraSinTildes = palabraMayusculas
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  
    // Quitar espacios alrededor
    const palabraConvertida = palabraSinTildes.trim();
  
    //@return {String} palabraConvertida: es la palabra ya convertida
    return palabraConvertida;
  }