import {generatePresetFunc} from "./utils.js";
const presetMap = {
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
  `
};
const localPresetKey = "atlas-viewer-presets";
try {
  const localData = localStorage.getItem(localPresetKey);
  if (localData) {
    Object.entries(JSON.parse(localData)).forEach(([k, v]) => presetMap[k] = v);
  }
} catch (e) {
  console.log("sync local data failed");
}
function updateLocalPreset(presetMap2) {
  localStorage.setItem(localPresetKey, JSON.stringify(presetMap2));
}
export var BackgroundType;
(function(BackgroundType2) {
  BackgroundType2[BackgroundType2["Transparent"] = 0] = "Transparent";
  BackgroundType2[BackgroundType2["Dark"] = 1] = "Dark";
  BackgroundType2[BackgroundType2["Light"] = 2] = "Light";
})(BackgroundType || (BackgroundType = {}));
const emptyPresetFuncBody = `return {set: 'empty', atlasList: []}`;
export const emptyPrest = generatePresetFunc(emptyPresetFuncBody);
export const initState = {
  imgData: {
    name: "",
    url: "",
    width: 0,
    height: 0
  },
  atlasData: {},
  atlasFileName: "",
  selectedAtlasSet: "",
  selectedAtlasItem: "",
  selectedPreset: "Laya",
  currentPresetFunc: generatePresetFunc(presetMap.Laya),
  presetMap,
  currentBackgournd: 0
};
export var Actions;
(function(Actions2) {
  Actions2[Actions2["SET_IMG_DATA"] = 0] = "SET_IMG_DATA";
  Actions2[Actions2["SET_ALTAS_DATA"] = 1] = "SET_ALTAS_DATA";
  Actions2[Actions2["SET_PRESET"] = 2] = "SET_PRESET";
  Actions2[Actions2["ADD_PRESET"] = 3] = "ADD_PRESET";
  Actions2[Actions2["UPDATE_PRESET"] = 4] = "UPDATE_PRESET";
  Actions2[Actions2["SET_SELECTED_ALTAS_ITEM"] = 5] = "SET_SELECTED_ALTAS_ITEM";
  Actions2[Actions2["SET_BACKGROUND"] = 6] = "SET_BACKGROUND";
})(Actions || (Actions = {}));
export function reducer(state, action) {
  let newPresetMap;
  switch (action.type) {
    case 0:
      return {...state, imgData: action.data};
    case 1:
      return {
        ...state,
        atlasData: JSON.parse(action.data.content),
        atlasFileName: action.data.name
      };
    case 2:
      return {
        ...state,
        selectedPreset: action.data,
        currentPresetFunc: generatePresetFunc(state.presetMap[action.data])
      };
    case 3:
      newPresetMap = {
        ...presetMap,
        [action.data]: emptyPresetFuncBody
      };
      updateLocalPreset(newPresetMap);
      return {
        ...state,
        presetMap: newPresetMap
      };
    case 4:
      newPresetMap = {
        ...state.presetMap,
        [state.selectedPreset]: action.data
      };
      updateLocalPreset(newPresetMap);
      return {
        ...state,
        presetMap: newPresetMap,
        currentPresetFunc: generatePresetFunc(action.data)
      };
    case 5:
      return {
        ...state,
        selectedAtlasItem: action.data.item,
        selectedAtlasSet: action.data.set
      };
    case 6:
      return {
        ...state,
        currentBackgournd: action.data
      };
    default:
      throw new Error("unknow action");
  }
}
