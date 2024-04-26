/**
 * Erhalte Mitarbeiterzahl eines Unternehmens
 * 
 * @param {name} Name des Unternehmens
 * @param {url} Homepage des Unternehmens
 * @return Mitarbeiterzah
 * @customfunction
 */

function MITARBEITERZAHL(companyURL = "") {
  var about_link = ABOUTURL(companyURL);
  var web_text = WEBTEXT(about_link);
  var gpt = GPT(web_text);
  var mitarbeiterzahl = convertToInteger(gpt);

  return mitarbeiterzahl;
}

function convertToInteger(str) {
    var integer = parseInt(str);
    
    if (!isNaN(integer)) {
        return integer;
    } else {
        return 0;
    }
}