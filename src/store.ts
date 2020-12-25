import { generatePresetFunc } from './utils';

export type PresetMap = { [key: string]: string };
const presetMap: PresetMap = {
  Laya: `
    return {
      set: data.meta.image,
      atlasList: Object.entries(data.frames).map(([k, v]) => {
        return {
          name: k,
          x: v.frame.x,
          y: v.frame.y,
          w: v.frame.w,
          h: v.frame.h,
        }
      })
    }
  `,
  Egret: `
    return {
      set: data.file,
      atlasList: Object.entries(data.frames).map(([k, v]) => {
        return {
          name: k,
          x: v.x,
          y: v.y,
          w: v.w,
          h: v.h,
        }
      })
    }
  `,
};

const localPresetKey = 'atlas-viewer-presets';
try {
  const localData = localStorage.getItem(localPresetKey);
  if (localData) {
    Object.entries(localData).forEach(([k, v]) => (presetMap[k] = v));
  }
} catch (e) {
  console.log('sync local data failed');
}

export interface Atlas {
  set: string;
  atlasList: Array<{
    name: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }>;
}

export type PresetFunc = (data: any) => Atlas | Atlas[];

export const emptyPrest = generatePresetFunc(
  `return {set: 'empty', atlasList: []}`,
);

export const initState = {
  imgData: {
    url: '',
    width: 0,
    height: 0,
  },
  altasData: {
    prop: {
      'a.png': {
        x: 1,
        y: 2,
        w: 3,
        h: 4,
      },
    },
    frames: [
      {
        name: 'a.png',
        x: 1,
        y: 2,
        w: 3,
        h: 4,
      },
    ],
    arr: [
      { 'a.png': [1, 2, 3, 4] },
      { 'b.png': [1, 2, 3, 4] },
      { 'c.png': [1, 2, 3, 4] },
    ],
  },
  selectedAtlasItem: '',
  selectedPreset: 'Laya',
  currentPresetFunc: generatePresetFunc(presetMap.Laya),
  presetMap,
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
      return {
        ...state,
        selectedPreset: action.data,
      };
    case Actions.UPDATE_PRESET:
      return {
        ...state,
        presetMap: {
          ...state.presetMap,
          [state.selectedPreset]: action.data,
        },
        currentPresetFunc: generatePresetFunc(action.data),
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
