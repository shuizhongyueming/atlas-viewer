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
  Phaser: `
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

export enum BackgroundType {
  Transparent,
  Dark,
  Light,
}

export interface AtlasInfo {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Atlas {
  set: string;
  atlasList: AtlasInfo[];
}

export type PresetFunc = (data: any) => Atlas | Atlas[];

const emptyPresetFuncBody = `return {set: 'empty', atlasList: []}`;
export const emptyPrest = generatePresetFunc(emptyPresetFuncBody);

export const initState = {
  imgData: {
    name: '',
    url: '',
    width: 0,
    height: 0,
  },
  atlasData: {},
  atlasFileName: '',
  selectedAtlasSet: '',
  selectedAtlasItem: '',
  selectedPreset: 'Laya',
  currentPresetFunc: generatePresetFunc(presetMap.Laya),
  presetMap,
  currentBackgournd: BackgroundType.Transparent,
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
  SET_BACKGROUND,
}

export function reducer(state: State, action: Action): State {
  let newPresetMap;
  switch (action.type) {
    case Actions.SET_IMG_DATA:
      return { ...state, imgData: action.data };
    case Actions.SET_ALTAS_DATA:
      return {
        ...state,
        atlasData: JSON.parse(action.data.content),
        atlasFileName: action.data.name,
      };
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
        selectedAtlasItem: action.data.item,
        selectedAtlasSet: action.data.set,
      };
    case Actions.SET_BACKGROUND:
      return {
        ...state,
        currentBackgournd: action.data,
      };
    default:
      throw new Error('unknow action');
  }
}
