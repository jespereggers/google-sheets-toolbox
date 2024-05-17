/**
 * Ermittele eine geschäftliche E-Mail Adresse
 * @param {firstName} String
 * @param {lastName} String
 * @param {companyDomain} String
 * @customfunction
 */

function MAIL(firstName, lastName, companyDomain) {
  const url = "https://api.prospeo.io/email-finder";
  const apiKey = "7dc82cd6dcd218ac9481ce44ba91d541"; // Replace with your actual API key

  const requiredHeaders = {
    "Content-Type": "application/json",
    "X-KEY": apiKey
  };

  const data = {
    first_name: firstName,
    last_name: lastName,
    company: companyDomain
  };

  const options = {
    method: "POST",
    headers: requiredHeaders,
    payload: JSON.stringify(data),
    muteHttpExceptions: true // Optional: it prevents the script from throwing exceptions for non-2xx HTTP responses
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    // Assuming the response contains an 'email' field in the JSON.
    return result.email ? result.email : "No email found";
  } catch (error) {
    Logger.log(error.toString());
    return "Error in fetching email: " + error.toString();
  }
}
