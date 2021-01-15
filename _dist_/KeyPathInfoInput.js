import React from "../web_modules/react.js";
import "./KeyPathInfoInput.css.proxy.js";
export function KeyPahtInfoInput({data, onChange}) {
  function handleChange(e) {
    const {name, value} = e.currentTarget;
    onChange({
      ...data,
      [name]: value
    });
  }
  const list = Object.entries(data).map(([k, v]) => /* @__PURE__ */ React.createElement("div", {
    className: "key-path-info__item",
    key: k
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: `key-path-info__${k}`
  }, k, "\uFF1A"), /* @__PURE__ */ React.createElement("input", {
    name: k,
    placeholder: k,
    value: v,
    onChange: handleChange,
    type: "text"
  }), " "));
  return /* @__PURE__ */ React.createElement("div", {
    className: "key-path-info"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "key-path-info__title"
  }, "Key Path Config: "), /* @__PURE__ */ React.createElement("div", {
    className: "key-path-info__list"
  }, list));
}
