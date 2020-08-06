const code=`.fileInput {\r
  flex: 50px 0 0;\r
  display: flex;\r
  flex-direction: row;\r
  align-items: center;\r
  margin-bottom: 10px;\r
}\r
.fileInput__name {\r
  font-size: 26px;\r
  margin-right: 10px;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
