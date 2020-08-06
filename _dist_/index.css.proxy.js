const code=`body {\r
  margin: 0;\r
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\r
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\r
    sans-serif;\r
  -webkit-font-smoothing: antialiased;\r
  -moz-osx-font-smoothing: grayscale;\r
}\r
\r
code {\r
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",\r
    monospace;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
