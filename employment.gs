/**
 * Erhalte Mitarbeiterzahl eines Unternehmens
 * 
 * @param {name} Name des Unternehmens
 * @param {url} Homepage des Unternehmens
 * @return Mitarbeiterzahl
 * @customfunction
 */


function EMPLOYMENT(companyURL = "") {
  var company_urls = [];

  var prompt = 'leistungen OR service OR dienstleistungen site:' + companyURL;

  var company_urls = googleSearch(prompt);

  for (let i = 0; i < company_urls.length; i++) {
    var web_data = WEBTEXT(company_urls[i]);
        console.log(web_data); // temporary


    var prompt = getEmployeePrompt(web_data);

    var gpt_output = GPT(prompt);

    if (gpt_output != 0 && gpt_output != "0") {
      return gpt_output;
    }
  }
  return 0;
}


function convertToInteger(str) {
    var integer = parseInt(str);
    
    if (!isNaN(integer)) {
        return integer;
    } else {
        return 0;
    }
}


function getEmployeePrompt(pageContent) {
  var prompt = `Suche die Anzahl der Mitarbeiter eines Unternehmens.\nDies ist der Inhalt der Unternehmensinfoseite:\n\n${pageContent}\n\Ermittele die richtige Mitarbeiterzahl.\nWichtig: Antworte immmer nur in diesem Format: int.\nAntworte im Notfall mit 0, wenn du nichts findest. Füge nie irgendwas anderes hinzu. Deine Antwort soll niemals Buchstaben enthalten.`;

  return prompt.substring(0, 50000);
}