/**
 * Ermittele Geschlecht eines Vornamens.
 * @param {name} String
 * @customfunction
 */


const GENDER = (name) => {
  // Cache Getter
  const key = ["gender", name].join(",");
  const value = getCache(key);
  if (value !== null) return value;

  var prompt = "Finde heraus, ob der Name Mann oder Frau ist: " + name + ". Antworte immer entweder Mann ODER Frau. Füge niemals irgendwas hinzu.";

  var gender_prop = GPT(prompt);
  
  // Cache Setter
  setCache(key, gender_prop);
  
  return gender_prop;
}
