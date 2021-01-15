export function getValueWithKeyPath(data, keyPath) {
  const keys = keyPath.split(".");
  return keys.reduce((res, n) => {
    if (res) {
      return res[n];
    }
    return res;
  }, data);
}
export function generatePresetFunc(body) {
  return new Function("data", body);
}
