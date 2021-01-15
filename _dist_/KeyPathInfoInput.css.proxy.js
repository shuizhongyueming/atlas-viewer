// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".key-path-info {\n  flex: auto 0 0;\n  margin-bottom: 10px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n}\n.key-path-info__list {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.key-path-info__title {\n  font-size: 28px;\n  line-height: 1;\n  margin-right: 20px;\n  flex: auto 0 0;\n}\n.key-path-info__item {\n  display: flex;\n  flex-direction: row;\n  margin-right: 10px;\n  margin-bottom: 4px;\n}\n.key-path-info__item label {\n  width: 80px;\n  text-align: right;\n}\n.key-path-info__item input {\n  width: 120px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}