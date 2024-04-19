function standardizeAddresses() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("A2:A" + sheet.getLastRow());
  var addresses = range.getValues();
  var apiKey = sheet.getRange("E2").getValue(); // Dein API-Schlüssel in Zelle B1

  for (var i = 0; i < addresses.length; i++) {
    if (addresses[i][0] !== "") {
      var formattedAddress = getFormattedAddress(addresses[i][0], apiKey);
      sheet.getRange(i + 2, 1).setValue(formattedAddress); // Ersetze die originale Adresse durch die formatierte Adresse
    }
  }
}

function getFormattedAddress(address, apiKey) {
  var addressEncoded = ""
  var addressEncoded = encodeURIComponent(address);
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressEncoded + "&key=" + apiKey;
  
  var response = UrlFetchApp.fetch(url);
  var json = JSON.parse(response.getContentText());
  
  if (json.status === "OK") {
    // Setze die formatierte Adresse ein, wenn die Geocodierung erfolgreich war
    return json.results[0].formatted_address;
  } else {
    // Gib die ursprüngliche Adresse zurück, wenn keine Geocodierung möglich war
    return address;
  }
}


function generateMenu() {
    
  var entries = [{
    name: "Adress Validator",
    functionName: "standardizeAddresses"
  }
  ];
  
  return entries;
}


function onOpen() {
  SpreadsheetApp.getActiveSpreadsheet().addMenu('Toolbox', generateMenu());
}