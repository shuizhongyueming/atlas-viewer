import c from"../web_modules/react.js";import"./FileInput.css.proxy.js";function h(e,f){const a=window.URL.createObjectURL(e),b=new Image();b.onload=function(){const g=b.naturalWidth||b.width,d=b.naturalHeight||b.height;f({url:a,width:g,height:d})},b.src=a}function i(e,f){const a=new FileReader();a.addEventListener("load",function(){f(a.result)}),a.readAsText(e)}export function FileInput({onImageChange:e,onAltasChange:f}){function a(g){const d=g.currentTarget.files?.[0];d&&h(d,e)}function b(g){const d=g.currentTarget.files?.[0];d&&i(d,f)}return c.createElement("div",{className:"fileInput"},c.createElement("div",{className:"fileInput__item"},c.createElement("span",{className:"fileInput__name"},"Image: "),c.createElement("input",{type:"file",onChange:a})),c.createElement("div",{className:"fileInput__item"},c.createElement("span",{className:"fileInput__name"},"Config: "),c.createElement("input",{type:"file",onChange:b})))}