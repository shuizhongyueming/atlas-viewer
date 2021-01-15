// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".presets {\r\n  flex: 50px 0 0;\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.presets__title {\r\n  font-size: 28px;\r\n  line-height: 1;\r\n  margin-right: 10px;\r\n}\r\n\r\n.presets__list {\r\n  list-style-type: none;\r\n  padding: 0;\r\n  margin: 0;\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n\r\n.presets__list li {\r\n  border: 1px solid lightskyblue;\r\n  margin-right: 8px;\r\n  border-radius: 3px;\r\n  padding: 2px 4px;\r\n  cursor: pointer;\r\n}\r\n\r\n.presets__list .presets__selected {\r\n  background: lightskyblue;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}