const code=`.atlas-list {\r
  flex: 20vw 0 0;\r
  border-left: 1px solid #000;\r
  padding-left: 4px;\r
  height: 100%;\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.atlas-list__title {\r
  font-size: 24px;\r
}\r
.atlas-list__list {\r
  list-style-type: none;\r
  padding: 10px;\r
  margin: 0;\r
  flex: auto 1 1;\r
  overflow-y: scroll;\r
}\r
.atlas-list__list li {\r
  cursor: pointer;\r
}\r
\r
.atlas-list__list li:hover {\r
  color: lightblue;\r
}\r
\r
.atlas-list__list li.atlas-list__selected {\r
  color: blue;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
