import type { Atlas, PresetFunc } from './store';

export function getValueWithKeyPath(data: any, keyPath: string) {
  const keys = keyPath.split('.');

  return keys.reduce((res, n) => {
    if (res) {
      return res[n];
    }
    return res;
  }, data);
}

export function generatePresetFunc(body: string): PresetFunc {
  return (new Function('data', body) as any) as PresetFunc;
}
