// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".atlas-list {\n  flex: 20vw 0 0;\n  border-left: 1px solid #000;\n  padding-left: 4px;\n  height: 100%;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.atlas-list__title {\n  font-size: 24px;\n}\n.atlas-list__content {\n  list-style-type: none;\n  padding: 10px;\n  margin: 0;\n  flex: auto 1 1;\n  overflow-y: scroll;\n}\n.atlas-list__list li {\n  cursor: pointer;\n}\n\n.atlas-list__list li:hover {\n  color: lightblue;\n}\n\n.atlas-list__list li.atlas-list__selected {\n  color: blue;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}