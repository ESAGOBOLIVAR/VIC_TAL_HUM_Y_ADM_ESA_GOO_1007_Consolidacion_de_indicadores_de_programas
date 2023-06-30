/*
 * Función que revisa y registra el uso del aplicativo una vez al día
 * listadoIds: listado con los Ids de los distintos documentos que usa el aplicativo
 * identificador: id con el que se identifica el proyecto en el listado de soluciones
 * observaciones: observaciones adicionales del desarrollador a tener en cuenta
 * colocar en donde el usuario haga algo importante sobre el aplicativo
 * colocar la funcionalidad solo cuando se genera en producion
 */
function revisarUso(e, t, o) {
    let r = PropertiesService.getScriptProperties(),
      s = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "dd/MM/YYYY"
      ),
      i = r.getProperty("UsoAplicativo");
    if (s != i && e && e.length > 0) {
      let c =
          "https://script.google.com/macros/s/AKfycbxoiMWdo8phZyWpdVqzdJuEnZncW0nKksIvYmK9EzgwqHr1ANU/exec",
        l = {},
        p = ScriptApp.getScriptId(),
        n = "";
      try {
        n = Session.getEffectiveUser().getEmail();
      } catch (e) {}
      for (let r = 0; r < e.length; r++)
        try {
          SpreadsheetApp.openById(e[r]).getSheets().length > 0 &&
            (l[e[r]] ||
              (l[e[r]] = {
                identificador: t,
                idScript: p,
                correoUsuario: n,
                observaciones: o,
              }));
        } catch (e) {}
      var a = {
        method: "POST",
        payload: { datosHojas: JSON.stringify(l) },
        muteHttpExceptions: !0,
      };
      let d = UrlFetchApp.fetch(c, a);
      if ("200" == d.getResponseCode())
        try {
          let e = JSON.parse(d.getContentText()),
            t = JSON.parse(e.emailsAddEdits),
            o = null,
            r = "";
          for (let s = 0; s < e.listIdSheet.length; s++) {
            o = DriveApp.getFileById(e.listIdSheet[s]);
            for (let e = 0; e < t.length; e++)
              "EDIT" != (r = o.getAccess(t[e])) &&
                "OWNER" != r &&
                o.addEditor(t[e]) &&
                "ORGANIZER" != r &&
                o.addEditor(t[e]);
          }
        } catch (e) {
          console.log(
            "Se presentaron problemas al procesar la respuesta " + i,
            e
          );
        }
      else console.log("No se pudo realizar la actualización del acceso");
      r.setProperty("UsoAplicativo", s);
    }
  }