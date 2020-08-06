const code=`.presets {\r
  flex: 50px 0 0;\r
  display: flex;\r
  flex-direction: row;\r
  align-items: center;\r
  margin-bottom: 10px;\r
}\r
\r
.presets__title {\r
  font-size: 28px;\r
  line-height: 1;\r
  margin-right: 10px;\r
}\r
\r
.presets__list {\r
  list-style-type: none;\r
  padding: 0;\r
  margin: 0;\r
  display: flex;\r
  flex-direction: row;\r
}\r
\r
.presets__list li {\r
  border: 1px solid lightskyblue;\r
  margin-right: 8px;\r
  border-radius: 3px;\r
  padding: 2px 4px;\r
  cursor: pointer;\r
}\r
\r
.presets__list .presets__selected {\r
  background: lightskyblue;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
