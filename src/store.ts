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
    Object.entries(JSON.parse(localData) as PresetMap).forEach(
      ([k, v]) => (presetMap[k] = v),
    );
  }
} catch (e) {
  console.log('sync local data failed');
}

function updateLocalPreset(presetMap: PresetMap) {
  localStorage.setItem(localPresetKey, JSON.stringify(presetMap));
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

const emptyPresetFuncBody = `return {set: 'empty', atlasList: []}`;
export const emptyPrest = generatePresetFunc(emptyPresetFuncBody);

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
  ADD_PRESET,
  UPDATE_PRESET,
  SET_SELECTED_ALTAS_ITEM,
}

export function reducer(state: State, action: Action): State {
  let newPresetMap;
  switch (action.type) {
    case Actions.SET_IMG_DATA:
      return { ...state, imgData: action.data };
    case Actions.SET_ALTAS_DATA:
      return { ...state, altasData: JSON.parse(action.data) };
    case Actions.SET_PRESET:
      return {
        ...state,
        selectedPreset: action.data,
        currentPresetFunc: generatePresetFunc(state.presetMap[action.data]),
      };
    case Actions.ADD_PRESET:
      newPresetMap = {
        ...presetMap,
        [action.data]: emptyPresetFuncBody,
      };
      updateLocalPreset(newPresetMap);
      return {
        ...state,
        presetMap: newPresetMap,
      };
    case Actions.UPDATE_PRESET:
      newPresetMap = {
        ...state.presetMap,
        [state.selectedPreset]: action.data,
      };
      updateLocalPreset(newPresetMap);
      return {
        ...state,
        presetMap: newPresetMap,
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
