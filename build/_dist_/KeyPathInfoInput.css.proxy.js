// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".key-path-info {\r\n  flex: auto 0 0;\r\n  margin-bottom: 10px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: no-wrap;\r\n}\r\n.key-path-info__list {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n}\r\n.key-path-info__title {\r\n  font-size: 28px;\r\n  line-height: 1;\r\n  margin-right: 20px;\r\n  flex: auto 0 0;\r\n}\r\n.key-path-info__item {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 10px;\r\n  margin-bottom: 4px;\r\n}\r\n.key-path-info__item label {\r\n  width: 80px;\r\n  text-align: right;\r\n}\r\n.key-path-info__item input {\r\n  width: 120px;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}