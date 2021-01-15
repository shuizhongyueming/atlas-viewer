import React from "../web_modules/react.js";
import "./FileInput.css.proxy.js";
function getImageInfo(file, cb) {
  const url = window.URL.createObjectURL(file);
  const img = new Image();
  img.onload = function() {
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    cb({url, width, height, name: file.name});
  };
  img.src = url;
}
function getAltasContent(file, cb) {
  const reader = new FileReader();
  reader.addEventListener("load", function() {
    cb({name: file.name, content: reader.result});
  });
  reader.readAsText(file);
}
export function FileInput({onImageChange, onAltasChange}) {
  function handleImageChange(e) {
    const file = e.currentTarget.files?.[0];
    if (file) {
      getImageInfo(file, onImageChange);
    }
  }
  function handleAltasChange(e) {
    const file = e.currentTarget.files?.[0];
    if (file) {
      console.log(file);
      getAltasContent(file, onAltasChange);
    }
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "fileInput"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "fileInput__item"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "fileInput__name"
  }, "Image: "), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    onChange: handleImageChange
  })), /* @__PURE__ */ React.createElement("div", {
    className: "fileInput__item"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "fileInput__name"
  }, "Config: "), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    onChange: handleAltasChange
  })));
}
