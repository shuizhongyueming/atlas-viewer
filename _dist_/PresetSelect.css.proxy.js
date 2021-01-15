// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".presets {\n  flex: 50px 0 0;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 10px;\n}\n\n.presets__title {\n  font-size: 28px;\n  line-height: 1;\n  margin-right: 10px;\n}\n\n.presets__list {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n}\n\n.presets__list li {\n  border: 1px solid lightskyblue;\n  margin-right: 8px;\n  border-radius: 3px;\n  padding: 2px 4px;\n  cursor: pointer;\n}\n\n.presets__list .presets__selected {\n  background: lightskyblue;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}