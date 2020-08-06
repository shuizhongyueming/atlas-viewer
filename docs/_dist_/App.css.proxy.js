const code=`.App {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100vh;\r
  overflow: hidden;\r
}\r
\r
.content {\r
  display: flex;\r
  flex-direction: row;\r
  flex: 100px 1 1;\r
  align-items: stretch;\r
  overflow: hidden;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
