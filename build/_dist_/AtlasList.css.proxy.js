// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".atlas-list {\r\n  flex: 20vw 0 0;\r\n  border-left: 1px solid #000;\r\n  padding-left: 4px;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.atlas-list__title {\r\n  font-size: 24px;\r\n}\r\n.atlas-list__content {\r\n  list-style-type: none;\r\n  padding: 10px;\r\n  margin: 0;\r\n  flex: auto 1 1;\r\n  overflow-y: scroll;\r\n}\r\n.atlas-list__list li {\r\n  cursor: pointer;\r\n}\r\n\r\n.atlas-list__list li:hover {\r\n  color: lightblue;\r\n}\r\n\r\n.atlas-list__list li.atlas-list__selected {\r\n  color: blue;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}