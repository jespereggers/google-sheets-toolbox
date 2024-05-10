/**
 * Ermittele Geschlecht eines Vornamens.
 * @param {name} String
 * @customfunction
 */

function GENDER(name) {
  var prompt = "Find out if the following name is male or female: " + name + ". Always respond in this format: 'male' OR 'female'. Never add anything else.";

  var gender_prop = GPT(prompt);

  if (gender_prop == "male") {
    return "Mann";
  }
  else {
    if (gender_prop == "female") {
      return "Frau";
    }
    else {
      return gender_prop;
    }
  }
}
