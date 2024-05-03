function setCell(value, cellID) {
  Utilities.sleep(1000);
  SpreadsheetApp.getActiveSheet().getRange(cellID).setValue(value);
}


function getCell() {
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();

  var x = cell.getColumn();
  var y = cell.getRow();
  
  return String.fromCharCode('A'.charCodeAt(0) + x - 1) + String(y);
}