// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".json-content {\n  width: 100%;\n}\n.json-viewer {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n}\n.json-viewer__left,\n.json-viewer__middle,\n.json-viewer__right {\n  flex: 1 1 33%;\n  height: 100%;\n}\n\n.json-viewer__right > div {\n  background-color: #fafafa;\n}\n.react-json-view {\n  overflow-y: hidden;\n  height: 100%;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}