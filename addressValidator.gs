function VALIDATE_ADDRESS(address) {    
  if (!address) {
    return "Keine Adresse angegeben";
  }

    var apiKey = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Konfigurationen").getRange("A2").getValue();

  var addressEncoded = encodeURIComponent(address);
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressEncoded + "&key=" + apiKey + "&language=de";
  
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
