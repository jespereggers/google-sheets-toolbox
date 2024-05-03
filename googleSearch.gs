function googleSearch(prompt) {
  var searchUrl = 'https://www.googleapis.com/customsearch/v1?key=' + GOOGLE_API_KEY + '&cx=' + GOOGLE_CS_ID + '&q=' + encodeURIComponent(prompt);
  
  
  try {
    // Make the HTTP request using UrlFetchApp
    var response = UrlFetchApp.fetch(searchUrl);
    var json = JSON.parse(response.getContentText());
    
    // Initialize an array to collect links
    var links = [];
    
    // Check if the 'items' key is present in the response
    if ('items' in json) {
      for (var i = 0; i < json.items.length; i++) {
        if (links.length < 3) {
          links.push(json.items[i].link);
        }
      }
    }
    
    // Return the first link if available
    if (links.length > 0) {
      return links;
    } else {
      return companyURL;
    }
  } catch (e) {
    return 'Fehler beim Abrufen der Daten: ' + e.toString();
  }
}
