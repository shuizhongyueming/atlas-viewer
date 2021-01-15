import React from "../web_modules/react.js";
import {BackgroundType} from "./store.js";
import "./BackgroundSelect.css.proxy.js";
const backgournds = {
  Transparent: BackgroundType.Transparent,
  Dark: BackgroundType.Dark,
  Light: BackgroundType.Light
};
export function BackgroundSelect({
  background,
  onChange
}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "background-select"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "background-select__title"
  }, "Background:"), /* @__PURE__ */ React.createElement("ul", {
    className: "background-select__list"
  }, Object.entries(backgournds).map(([k, v]) => /* @__PURE__ */ React.createElement("li", {
    key: k,
    "data-id": k,
    className: background === v ? "background-select__selected" : "",
    onClick: (e) => {
      const {id} = e.currentTarget?.dataset;
      console.log("id: ", id);
      if (id && typeof backgournds[id] !== "undefined") {
        console.log("id: ", id, backgournds[id]);
        onChange(backgournds[id]);
      }
    }
  }, k))));
}
