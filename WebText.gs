function WEBTEXT(url) {
  try {
    var response = UrlFetchApp.fetch(url);
    var htmlContent = response.getContentText();
    var textContent = htmlContent.replace(/<(?:.|\n)*?>/gm, '');
    var cleanText = removeContentBetweenBraces(textContent);
    cleanText = cleanLines(cleanText);
    cleanText = removeLeadingSpaces(cleanText);
    return cleanText;
} catch (e) {
  return 'Error retrieving the data: ' + e.toString();
  }
}

function removeContentBetweenBraces(inputString) {
    var regex = /{[^}]*}/g;
    
    var result = inputString.replace(regex, '');

    return result;
}

function cleanLines(inputString) {
    var invalidLineBeginnings = [".", "#", "@", "/", "}", "window.", ":", "body", "var", "if", "else", "document", "function", "gtag", "oldWidth", "[", "img.", "newh =", "el ="];
    var lines = inputString.split(/\r?\n/);
    
    var filteredLines = lines.filter(function(line) {
        return !invalidLineBeginnings.some(function(beginning) {
            return line.trim().startsWith(beginning);
        }) && line.trim() !== '';
    });
    
    var result = filteredLines.join('\n');

    return result;
}

function removeLeadingSpaces(inputString) {
    var lines = inputString.split(/\r?\n/);
    
    var trimmedLines = lines.map(function(line) {
        return line.trimLeft();
    });
    
    var result = trimmedLines.join('\n');

    return result;
}