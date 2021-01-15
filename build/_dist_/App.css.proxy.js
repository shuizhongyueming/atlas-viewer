// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".App {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100vh;\r\n  overflow: hidden;\r\n}\r\n\r\n.head-actions {\r\n  display: flex;\r\n  flex-direction: row;\r\n  padding-top: 20px;\r\n}\r\n.head-actions__left,\r\n.head-actions__right {\r\n  flex: 1 1 50%;\r\n}\r\n\r\n.content {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex: 100px 1 1;\r\n  align-items: stretch;\r\n  overflow: hidden;\r\n}\r\n\r\n.content .rc-tabs {\r\n  width: 100%;\r\n  border: none;\r\n}\r\n.content .rc-tabs-nav {\r\n  margin-bottom: 20px;\r\n}\r\n.content .rc-tabs-content-holder {\r\n  flex: 1 1;\r\n  overflow: hidden;\r\n}\r\n.content .rc-tabs-tab {\r\n  margin-left: 20px;\r\n}\r\n.content .rc-tabs-tab-btn:focus {\r\n  outline: none;\r\n}\r\n.content .rc-tabs-content {\r\n  height: 100%;\r\n}\r\n.content .rc-tabs-tabpane:focus {\r\n  outline: none;\r\n}\r\n.content .rc-tabs-tabpane {\r\n  display: flex;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}