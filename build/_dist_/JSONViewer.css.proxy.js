// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".json-content {\r\n  width: 100%;\r\n}\r\n.json-viewer {\r\n  display: flex;\r\n  flex-direction: row;\r\n  height: 100%;\r\n}\r\n.json-viewer__left,\r\n.json-viewer__middle,\r\n.json-viewer__right {\r\n  flex: 1 1 33%;\r\n  height: 100%;\r\n}\r\n\r\n.json-viewer__right > div {\r\n  background-color: #fafafa;\r\n}\r\n.react-json-view {\r\n  overflow-y: hidden;\r\n  height: 100%;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}