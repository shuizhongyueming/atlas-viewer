const code=`.img-viewer {\r
  flex: 500px 1 1;\r
  position: relative;\r
  height: 100%;\r
  background-color: #ffffff;\r
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='000000' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M0 0h12v12H0V0zm12 12h12v12H12V12z'/%3E%3C/g%3E%3C/svg%3E");\r
}\r
.img-viewer img {\r
  margin: 0;\r
  padding: 0;\r
  display: block;\r
  border: none;\r
  max-width: 100%;\r
  max-height: 100%;\r
  min-height: 100px;\r
}\r
.img-viewer__item {\r
  position: absolute;\r
  box-sizing: border-box;\r
  border: 1px dashed black;\r
}\r
.img-viewer__item:hover,\r
.img-viewer__item.selected {\r
  background-color: rgba(33, 150, 243, 33%);\r
  border-color: red;\r
  border-width: 2px;\r
}\r
`,styleEl=document.createElement("style"),codeEl=document.createTextNode(code);styleEl.type="text/css",styleEl.appendChild(codeEl),document.head.appendChild(styleEl);
