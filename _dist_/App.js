import React, {useReducer} from "../web_modules/react.js";
import "./App.css.proxy.js";
import {FileInput as FileInput2} from "./FileInput.js";
import {PresetSelect as PresetSelect2} from "./PresetSelect.js";
import {ImgViewer as ImgViewer2} from "./ImgViewer.js";
import {reducer, initState, Actions} from "./store.js";
import {AtlasList as AtlasList2} from "./AtlasList.js";
import Tabs, {TabPane} from "../web_modules/rc-tabs.js";
import "../web_modules/rc-tabs/assets/index.css.proxy.js";
import {JSONViewer as JSONViewer2} from "./JSONViewer.js";
import {BackgroundSelect as BackgroundSelect2} from "./BackgroundSelect.js";
function App2({}) {
  const [state, dispatch] = useReducer(reducer, initState);
  let atlas = [];
  try {
    const data = state.currentPresetFunc(state.atlasData);
    if (!Array.isArray(data)) {
      atlas = [data];
    } else {
      atlas = data;
    }
    console.log("update atlas: ", atlas);
  } catch (e) {
    console.log("update atlas failed: ", e.message);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "head-actions"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "head-actions__left"
  }, /* @__PURE__ */ React.createElement(PresetSelect2, {
    selectedPreset: state.selectedPreset,
    presetList: Object.keys(state.presetMap),
    onChange: (preset) => dispatch({type: Actions.SET_PRESET, data: preset}),
    handleAddPresetName: (presetName) => dispatch({type: Actions.ADD_PRESET, data: presetName})
  }), /* @__PURE__ */ React.createElement(FileInput2, {
    onAltasChange: (altasData) => dispatch({type: Actions.SET_ALTAS_DATA, data: altasData}),
    onImageChange: (imgData) => dispatch({type: Actions.SET_IMG_DATA, data: imgData})
  })), /* @__PURE__ */ React.createElement("div", {
    className: "head-actions__right"
  }, /* @__PURE__ */ React.createElement(BackgroundSelect2, {
    background: state.currentBackgournd,
    onChange: (b) => dispatch({type: Actions.SET_BACKGROUND, data: b})
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "content"
  }, /* @__PURE__ */ React.createElement(Tabs, null, /* @__PURE__ */ React.createElement(TabPane, {
    tab: "Image",
    key: "1"
  }, /* @__PURE__ */ React.createElement(ImgViewer2, {
    imgData: state.imgData,
    atlasData: atlas,
    atlasFileName: state.atlasFileName,
    currentBackgournd: state.currentBackgournd,
    selectedAtlasSet: state.selectedAtlasSet,
    selectedAtlasItem: state.selectedAtlasItem,
    onSelect: (n) => dispatch({type: Actions.SET_SELECTED_ALTAS_ITEM, data: n})
  }), /* @__PURE__ */ React.createElement(AtlasList2, {
    atlasData: atlas,
    selectedAtlasSet: state.selectedAtlasSet,
    selectedAtlasItem: state.selectedAtlasItem,
    onSelect: (n) => dispatch({type: Actions.SET_SELECTED_ALTAS_ITEM, data: n})
  })), /* @__PURE__ */ React.createElement(TabPane, {
    tab: "JSON",
    key: "2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "json-content"
  }, /* @__PURE__ */ React.createElement(JSONViewer2, {
    json: state.atlasData,
    presetBody: state.presetMap[state.selectedPreset],
    presetFunc: state.currentPresetFunc,
    onChange: (d) => dispatch({type: Actions.UPDATE_PRESET, data: d})
  }))))));
}
export default App2;
