/**
 * Erhalte Informationsseite zum Unternehemen
 * @customfunction
 */

function ABOUTURL(companyURL) {
  var searchTerm = 'mitarbeiter OR team OR ueber_uns OR unternehmen OR profil site:' + companyURL;
  
  // Construct the URL for the Google Custom Search API request
  var searchUrl = 'https://www.googleapis.com/customsearch/v1?key=' + GOOGLE_API_KEY + '&cx=' + GOOGLE_CS_ID + '&q=' + encodeURIComponent(searchTerm);
  
  try {
    // Make the HTTP request using UrlFetchApp
    var response = UrlFetchApp.fetch(searchUrl);
    var json = JSON.parse(response.getContentText());
    
    // Initialize an array to collect links
    var links = [];
    
    // Check if the 'items' key is present in the response
    if ('items' in json) {
      for (var i = 0; i < json.items.length; i++) {
        links.push(json.items[i].link);
      }
    }
    
    // Return the first link if available
    if (links.length > 0) {
      return links[0];
    } else {
      return companyURL;
    }
  } catch (e) {
    return 'Fehler beim Abrufen der Daten: ' + e.toString();
  }
}
