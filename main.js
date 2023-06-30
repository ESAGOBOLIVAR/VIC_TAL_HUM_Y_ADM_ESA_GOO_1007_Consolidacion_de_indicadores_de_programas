// //@ param {String} e: puede ser la ruta que quiero que se dirija
// function doGet(e) {
//   let template;
//   if (e.parameters.v == "form") {
//     template = HtmlService.createTemplateFromFile(
//       "frontend/components/Usuario/TablaUsuario"
//     );
//   } else {
//     template = HtmlService.createTemplateFromFile("frontend/index");
//   }
//   return template
//     .evaluate()
//     .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
//     .setSandboxMode(HtmlService.SandboxMode.IFRAME)
//     .addMetaTag(
//       "viewport",
//       'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"'
//     )
//     .setTitle("Nombre Proyecto");
// }

// function include(filename) {
//   return HtmlService.createHtmlOutputFromFile(filename).getContent();
// }

// function doGet() {
//   let template = HtmlService.createTemplateFromFile("frontend/index");
//   return template
//     .evaluate()
//     .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
//     .setSandboxMode(HtmlService.SandboxMode.IFRAME)
//     .addMetaTag(
//       "viewport",
//       'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"'
//     )
//     .setTitle("Nombre Proyecto");
// }

// function include(filename) {
//   return HtmlService.createHtmlOutputFromFile(filename).getContent();
// }

const doGet = (e) => {
  let parameters = e.parameters;
  //@se retorna la ruta de Route en base al parametro recibido
  return Route(parameters);
};

/*
 * Función que recibe los parámetros y realiza redireccionamiento web
 */

const Route = (parameters) => {
  //
  let view = "pag" in parameters ? base64ToString(parameters.pag[0]) : null; // Se valida si existe el parámetro

  switch (
    view // Se valida la opción de redireccionamiento web
  ) {
    case "consultar":
      return Render("frontend/pages/consultar/page.html", "Consultar Title");
    default:
      return Render("frontend/index", "Inicio Title");
  } // Fin se valida la opción de redireccionamiento web
};

/*
 * Función que recibe el archivo html y titulo a mostrar cómo página
 */

const Render = (file, tittle) => {
  let html = HtmlService.createTemplateFromFile(file)
    .evaluate()
    .setTitle(tittle);
  html.addMetaTag("viewport", "width=device-width, initial-scale=1.0");
  html.setFaviconUrl(
    "https://raw.githubusercontent.com/ESAGOBOLIVAR/recursos-de-imagenes/logo-esago/Esago-Favicon.png"
  );

  return html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};

/**
 * Obtiene el contenido HTML del archivo especificado
 * @param {String} filename Nombre del archivo
 * @return {Stirng} Contenido HTML de un archivo especificado dentro del Proyecto App Script
 */

const include = (filename) => {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
};

/*
 * Se obtiene la url del módulo a abrir y consulta de módulo 1
 */
function consultar() {
  let formulario = stringToBase64(`consultar`); // Se obtiene formulario html en código 64
  // let urlProyecto = `ScriptApp.getService().getUrl()?pag=${formulario}`; // Se obtiene url actual del proyecto en producción
  let urlProyecto = `https://script.google.com/a/macros/servinformacion.com/s/AKfycby2hbg78DqhKb5C76tLSp2IgJNL36coDzppYz5fUpx7/dev?pag=${formulario}`; // Se obtiene url actual de desarrollador del proyecto

  //@return {Json stringify} urlProyecto: es la url del proyecto convertida
  return JSON.stringify(urlProyecto);
}

/*
 * Se convierte string a código base 64
 */
function stringToBase64(string) {
  let stringe = Utilities.base64Encode(string).replaceAll("=", "");
  return stringe;
}

/*
 * Se convierte código base 64 a string
 */
function base64ToString(string) {
  let decoded = Utilities.base64Decode(string); // decoded string
  let stringe = Utilities.newBlob(decoded).getDataAsString(); // csv string
  return stringe;
}
