// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".fileInput {\n  flex: 50px 0 0;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.fileInput__name {\n  font-size: 26px;\n  margin-right: 10px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}