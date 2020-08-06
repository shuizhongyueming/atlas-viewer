export function getValueWithKeyPath(data: any, keyPath: string) {
  const keys = keyPath.split('.');

  return keys.reduce((res, n) => {
    if (res) {
      return res[n];
    }
    return res;
  }, data);
}
