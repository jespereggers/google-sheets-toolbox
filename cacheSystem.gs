const md5 = (key = "") => {
  const code = key.toLowerCase().replace(/\s/g, "");
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, key)
    .map((char) => (char + 256).toString(16).slice(-2))
    .join("");
};

const getCache = (key) => {
  return CacheService.getDocumentCache().get(md5(key));
};

const setCache = (key, value) => {
  const expirationInSeconds = 6 * 60 * 60; // max is 6 hours
  CacheService.getDocumentCache().put(md5(key), value, expirationInSeconds);
};