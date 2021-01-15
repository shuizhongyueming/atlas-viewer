// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".img-viewer {\r\n  flex: 500px 1 1;\r\n  position: relative;\r\n  height: 100%;\r\n}\r\n.img-viewer.transparent {\r\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='000000' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M0 0h12v12H0V0zm12 12h12v12H12V12z'/%3E%3C/g%3E%3C/svg%3E\");\r\n}\r\n.img-viewer.dark {\r\n  background: #000;\r\n}\r\n.img-viewer.light {\r\n  background: #fff;\r\n}\r\n.img-viewer canvas {\r\n  margin: 0;\r\n  padding: 0;\r\n  display: block;\r\n  border: none;\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  min-height: 100px;\r\n}\r\n.img-viewer__item {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  border: 1px dashed black;\r\n}\r\n.img-viewer.dark .img-viewer__item {\r\n  border-color: #fff;\r\n}\r\n.img-viewer__item:hover,\r\n.img-viewer__item.selected {\r\n  background-color: rgba(33, 150, 243, 33%);\r\n  border-color: red !important;\r\n  border-width: 2px;\r\n}\r\n.img-viewer__delete,\r\n.img-viewer__download {\r\n  position: absolute;\r\n  z-index: 10;\r\n  top: 20px;\r\n  right: 20px;\r\n}\r\n.img-viewer__delete {\r\n  right: 150px;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}