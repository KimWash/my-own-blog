export  function isJSONObject(object: any) {
  try {
    JSON.parse(object);
    return true;
  } catch (e) {
    return false;
  }
}
