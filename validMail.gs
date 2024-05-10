/**
 * Überprüfe Gültigkeit einer E-Mail Adresse
 * @param {emailAddress} String
 * @customfunction
 */


function VALIDMAIL(emailAddress) {
  const url = "https://api.prospeo.io/email-verifier";
  const apiKey = PROSPEO_API_KEY; // Replace with your actual API key

  const requiredHeaders = {
    "Content-Type": "application/json",
    "X-KEY": apiKey
  };
  console.log(emailAddress);

  const data = {
    email: "jesper.eggers@gmail.com" // Ensure this is not null or undefined
  };

  const options = {
    method: "POST",
    headers: requiredHeaders,
    payload: JSON.stringify(data),
    muteHttpExceptions: true // Prevents the script from throwing exceptions for non-2xx HTTP responses
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    console.log(result);
    if (result.error) {
      return "API Error: " + result.message; // Show API error messages directly
    }
    return result; // This will return the entire JSON response
  } catch (error) {
    Logger.log(error.toString());
    return "Error in verifying email: " + error.toString();
  }
}
