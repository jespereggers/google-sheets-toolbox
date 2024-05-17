/**
 * Kategorisiere Geschäft eines Unternehmens.
 * 
 * @param {companyURL} Homepage des Unternehmens
 * @return Geschäftskategorie
 * @customfunction
 * 
 */


function SERVICE(companyURL = "") {
  // Cache Getter
  const key = ["service", companyURL].join(",");
  const value = getCache(key);
  if (value !== null) return value;

  var service_urls = [];
  var result = "UNKNOWN";

  var prompt = 'leistungen OR service OR dienstleistungen site:' + companyURL;

  service_urls = googleSearch(prompt);

  for (let i = 0; i < service_urls.length; i++) {
    var web_data = WEBTEXT(service_urls[i]);
    console.log(web_data); // temporary

    var prompt = getServicePrompt(web_data);

    var gpt_output = GPT(prompt);
    
    if (gpt_output != "UNKNOWN") {
      result = gpt_output;
      break;
      }
  }
  // Cache Setter
  setCache(key, gender_prop);

  return result;
}


// Händler, Hersteller, Handwerker, Unknown

function getServicePrompt(web_text) {
  var prompt = `Das folgende führt die Dienstleistungen eines Unternehmens auf:\n\n${web_text}\n\nEntscheide, auf welche Kategorie das Unternehmen aufbaut: Händler, Hersteller oder Handwerker. Händler verkaufen Equipment weiter, Hersteller produzieren Werkzeug und Handwerker bringen das Werkzeug zur Anwendung.\nWichtig: Antworte immmer nur in diesem Format: HÄNDLER oder HERSTELLER oder HANDWERKER.\nAntworte mit UNKNOWN, wenn nichts zuordnen kannst. Füge nie irgendwas anderes hinzu. Deine Antwort soll niemals mehr als einer dieser drei Wörter enthalten.`;

  return prompt;
}