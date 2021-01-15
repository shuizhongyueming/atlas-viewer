import React, {useState} from "../web_modules/react.js";
import "./PresetSelect.css.proxy.js";
export function PresetSelect({
  selectedPreset,
  presetList,
  onChange,
  handleAddPresetName
}) {
  const [isAddingPreset, updateIsAddingPreset] = useState(false);
  const [presetName, updatePresetName] = useState("");
  function handeClicked(e) {
    const {id} = e.currentTarget.dataset;
    if (id) {
      onChange(id);
    }
  }
  const list = presetList.map((n) => /* @__PURE__ */ React.createElement("li", {
    key: n,
    "data-id": n,
    className: n === selectedPreset ? "presets__selected" : "",
    onClick: handeClicked
  }, n));
  return /* @__PURE__ */ React.createElement("div", {
    className: "presets"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "presets__title"
  }, "Presets: "), /* @__PURE__ */ React.createElement("ul", {
    className: "presets__list"
  }, list), !isAddingPreset ? /* @__PURE__ */ React.createElement("button", {
    onClick: () => updateIsAddingPreset(true)
  }, "Add Preset") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", {
    value: presetName,
    onChange: (e) => updatePresetName(e.target.value.trim()),
    placeholder: "Preset Name"
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      handleAddPresetName(presetName);
      updatePresetName("");
      updateIsAddingPreset(false);
    }
  }, "Submit"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => updateIsAddingPreset(false)
  }, "Cancel")));
}
