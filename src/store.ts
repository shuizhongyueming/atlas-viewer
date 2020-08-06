import { act } from 'react-dom/test-utils';

export const emptyKeyPathInfo = {
  setType: 'object',
  set: '',
  name: '',
  x: '',
  y: '',
  w: '',
  h: '',
};

export type KeyPathInfo = typeof emptyKeyPathInfo;

const presetMap: { [key: string]: KeyPathInfo } = {
  Laya: {
    setType: 'object',
    set: 'frames',
    name: '0',
    x: '1.frame.x',
    y: '1.frame.y',
    w: '1.frame.w',
    h: '1.frame.h',
  },
  Egret: {
    setType: 'object',
    set: 'frames',
    name: '0',
    x: '1.x',
    y: '1.y',
    w: '1.w',
    h: '1.h',
  },
};

export const initState = {
  imgData: {
    url: '',
    width: 0,
    height: 0,
  },
  altasData: {},
  selectedAtlasItem: '',
  keyPathInfo: { ...presetMap.Laya },
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
  SET_PRESET,
  UPDATE_PRESET,
  SET_SELECTED_ALTAS_ITEM,
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SET_IMG_DATA:
      return { ...state, imgData: action.data };
    case Actions.SET_ALTAS_DATA:
      return { ...state, altasData: JSON.parse(action.data) };
    case Actions.SET_PRESET:
      const presetInfo = presetMap[action.data]
        ? presetMap[action.data]
        : emptyKeyPathInfo;
      return {
        ...state,
        selectedPreset: action.data,
        keyPathInfo: { ...presetInfo },
      };
    case Actions.UPDATE_PRESET:
      return {
        ...state,
        keyPathInfo: { ...action.data },
      };
    case Actions.SET_SELECTED_ALTAS_ITEM:
      return {
        ...state,
        selectedAtlasItem: action.data,
      };
    default:
      throw new Error('unknow action');
  }
}
