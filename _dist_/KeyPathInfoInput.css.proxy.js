const code=`.key-path-info {\r
  flex: auto 0 0;\r
  margin-bottom: 10px;\r
  display: flex;\r
  flex-direction: row;\r
  flex-wrap: no-wrap;\r
}\r
.key-path-info__list {\r
  display: flex;\r
  flex-direction: row;\r
  flex-wrap: wrap;\r
  align-items: center;\r
}\r
.key-path-info__title {\r
  font-size: 28px;\r
  line-height: 1;\r
  margin-right: 20px;\r
  flex: auto 0 0;\r
}\r
.key-path-info__item {\r
  display: flex;\r
  flex-direction: row;\r
  margin-right: 10px;\r
  margin-bottom: 4px;\r
}\r
.key-path-info__item label {\r
  width: 80px;\r
  text-align: right;\r
}\r
.key-path-info__item input {\r
  width: 120px;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
