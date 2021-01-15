// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".App {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n\n.head-actions {\n  display: flex;\n  flex-direction: row;\n  padding-top: 20px;\n}\n.head-actions__left,\n.head-actions__right {\n  flex: 1 1 50%;\n}\n\n.content {\n  display: flex;\n  flex-direction: row;\n  flex: 100px 1 1;\n  align-items: stretch;\n  overflow: hidden;\n}\n\n.content .rc-tabs {\n  width: 100%;\n  border: none;\n}\n.content .rc-tabs-nav {\n  margin-bottom: 20px;\n}\n.content .rc-tabs-content-holder {\n  flex: 1 1;\n  overflow: hidden;\n}\n.content .rc-tabs-tab {\n  margin-left: 20px;\n}\n.content .rc-tabs-tab-btn:focus {\n  outline: none;\n}\n.content .rc-tabs-content {\n  height: 100%;\n}\n.content .rc-tabs-tabpane:focus {\n  outline: none;\n}\n.content .rc-tabs-tabpane {\n  display: flex;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}