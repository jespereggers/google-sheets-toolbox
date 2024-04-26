/**
 * Konvertiere Addresse in normiertes Format
 * @customfunction
 */

function ADDRESSE(address) {
  var api_key = 'AIzaSyC1MSqj1uw4eoXKtFXSbADwjN4RaW0Mp_4'

  if (!address) {
    return "Keine Adresse angegeben";
  }

  var addressEncoded = encodeURIComponent(address);
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressEncoded + "&key=" + api_key + "&language=de";
  
  try {
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());
    
    if (json.status === "OK") {
      return json.results[0].formatted_address;
    } else {
      return json.status + (json.error_message ? ": " + json.error_message : "");
    }
  } catch (e) {
    return "Fehler beim Abrufen der Daten: " + e.toString();
  }
}