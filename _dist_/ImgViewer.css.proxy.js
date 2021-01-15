// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".img-viewer {\n  flex: 500px 1 1;\n  position: relative;\n  height: 100%;\n}\n.img-viewer.transparent {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='000000' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M0 0h12v12H0V0zm12 12h12v12H12V12z'/%3E%3C/g%3E%3C/svg%3E\");\n}\n.img-viewer.dark {\n  background: #000;\n}\n.img-viewer.light {\n  background: #fff;\n}\n.img-viewer canvas {\n  margin: 0;\n  padding: 0;\n  display: block;\n  border: none;\n  max-width: 100%;\n  max-height: 100%;\n  min-height: 100px;\n}\n.img-viewer__item {\n  position: absolute;\n  box-sizing: border-box;\n  border: 1px dashed black;\n}\n.img-viewer.dark .img-viewer__item {\n  border-color: #fff;\n}\n.img-viewer__item:hover,\n.img-viewer__item.selected {\n  background-color: rgba(33, 150, 243, 33%);\n  border-color: red !important;\n  border-width: 2px;\n}\n.img-viewer__delete,\n.img-viewer__download {\n  position: absolute;\n  z-index: 10;\n  top: 20px;\n  right: 20px;\n}\n.img-viewer__delete {\n  right: 150px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}