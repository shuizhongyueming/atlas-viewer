export const initState = {
  imgData: {
    url: '',
    width: 0,
    height: 0,
  },
  altasData: {},
  displaySize: {
    width: 0,
    height: 0,
  },
  keyPathInfo: {
    setType: 'object',
    nameKeyPath: '',
    xKeyPaht: '',
    yKeyPaht: '',
    wKeyPaht: '',
    hKeyPaht: '',
  },
  selectedPreset: 'Laya',
  presets: ['Laya', 'Egret', 'Custom'],
};

export type State = typeof initState;
export interface Action {
  type: Actions;
  data?: any;
}

export enum Actions {
  SET_IMG_DATA,
  SET_ALTAS_DATA,
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SET_IMG_DATA:
      return { ...state, imgData: action.data };
    case Actions.SET_ALTAS_DATA:
      return { ...state, altasData: JSON.parse(action.data) };
    default:
      throw new Error('unknow action');
  }
}
