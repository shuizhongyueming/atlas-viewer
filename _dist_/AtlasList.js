import React from "../web_modules/react.js";
import "./AtlasList.css.proxy.js";
export function AtlasList({
  atlasData,
  selectedAtlasSet,
  selectedAtlasItem,
  onSelect
}) {
  function onClick(e) {
    const {id, set} = e.currentTarget.dataset;
    if (id && set) {
      onSelect({item: id, set});
    }
  }
  let list = atlasData.map(({set, atlasList}) => /* @__PURE__ */ React.createElement("div", {
    className: "atlas-set",
    key: set
  }, /* @__PURE__ */ React.createElement("div", {
    className: "atlas-set__title"
  }, set), /* @__PURE__ */ React.createElement("ul", {
    className: "atlas-list__list"
  }, atlasList.map(({name}) => /* @__PURE__ */ React.createElement("li", {
    key: name,
    "data-id": name,
    "data-set": set,
    onClick,
    className: selectedAtlasItem === name && selectedAtlasSet === set ? "atlas-list__selected" : ""
  }, name)))));
  return /* @__PURE__ */ React.createElement("div", {
    className: "atlas-list"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "atlas-list__title"
  }, "Altas List"), /* @__PURE__ */ React.createElement("div", {
    className: "atlas-list__content"
  }, list));
}
