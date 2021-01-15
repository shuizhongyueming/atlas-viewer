import ReactJson from "../web_modules/react-json-view.js";
import React, {useEffect, useState} from "../web_modules/react.js";
import {emptyPrest} from "./store.js";
import {generatePresetFunc} from "./utils.js";
import "./JSONViewer.css.proxy.js";
import Editor from "../web_modules/react-simple-code-editor.js";
import {highlight, languages} from "../web_modules/prismjs/components/prism-core.js";
import "../web_modules/prismjs/components/prism-clike.js";
import "../web_modules/prismjs/components/prism-javascript.js";
import "../web_modules/prismjs/themes/prism.css.proxy.js";
var presetFunc = emptyPrest;
export function JSONViewer(props) {
  const {json, presetBody, onChange} = props;
  const [isPreview, updatePreviewState] = useState(false);
  const [errMsg, updateErrMsg] = useState("");
  const [funcBody, updateFuncBody] = useState(presetBody);
  const [data, updateData] = useState(json);
  useEffect(() => {
    updateFuncBody(presetBody);
  }, [presetBody]);
  function previewData() {
    try {
      presetFunc = generatePresetFunc(funcBody);
      updateData(presetFunc(json));
      console.log("update data: ", data);
    } catch (e) {
      updateErrMsg(e.message);
    }
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "json-viewer"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "json-viewer__left"
  }, errMsg && /* @__PURE__ */ React.createElement("p", null, "Error: ", errMsg), /* @__PURE__ */ React.createElement(ReactJson, {
    src: data,
    indentWidth: 2,
    collapsed: 2,
    displayObjectSize: false,
    displayDataTypes: false,
    enableClipboard: false
  })), /* @__PURE__ */ React.createElement("div", {
    className: "json-viewer__middle"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: previewData,
    disabled: isPreview
  }, "Preview"), /* @__PURE__ */ React.createElement("button", {
    disabled: presetBody === funcBody,
    onClick: () => onChange(funcBody)
  }, "Submit"), /* @__PURE__ */ React.createElement("p", null, "Make a function to transfer atlasData to structure of:"), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, `
        {
          set: string;
          atlasList: Array<{
            name: string,
            x: number,
            y: number,
            w: number,
            h: number
          }>
        }`)), /* @__PURE__ */ React.createElement("p", null, "or a list of that structure.")), /* @__PURE__ */ React.createElement("div", {
    className: "json-viewer__right"
  }, /* @__PURE__ */ React.createElement(Editor, {
    value: funcBody,
    onValueChange: (code) => {
      updateFuncBody(code);
      updatePreviewState(false);
    },
    highlight: (code) => highlight(code, languages.js),
    padding: 10,
    style: {
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 14
    }
  })));
}
