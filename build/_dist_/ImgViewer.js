import React, {useState, useRef, useEffect} from "../web_modules/react.js";
import {BackgroundType} from "./store.js";
import "./ImgViewer.css.proxy.js";
const backgroundClassName = {
  [BackgroundType.Transparent]: "transparent",
  [BackgroundType.Dark]: "dark",
  [BackgroundType.Light]: "light"
};
const imgDatas = [];
export function ImgViewer({
  imgData,
  atlasData: altasData,
  atlasFileName,
  selectedAtlasSet,
  selectedAtlasItem,
  currentBackgournd,
  onSelect
}) {
  const cvs = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (cvs.current) {
      const img = new Image();
      img.onload = () => {
        if (cvs.current) {
          const ctx = cvs.current.getContext("2d");
          ctx?.drawImage(img, 0, 0);
        }
      };
      img.src = imgData.url;
      if (cvs.current) {
        setScale(cvs.current.getBoundingClientRect().width / imgData.width);
      }
    }
  }, [imgData]);
  function handleKeyDown(e) {
    console.log(e.key);
    if (e.key === "Backspace") {
      return handleDelete();
    }
    if (e.ctrlKey && e.key === "z") {
      const imgData2 = imgDatas.pop();
      const ctx = cvs.current?.getContext("2d");
      if (imgData2 && ctx) {
        ctx.putImageData(imgData2.data, imgData2.info.x, imgData2.info.y);
      }
    }
  }
  function handleDelete() {
    const targetSet = altasData.find((n) => n.set === selectedAtlasSet);
    if (targetSet) {
      const targetRect = targetSet.atlasList.find((n) => n.name === selectedAtlasItem);
      if (targetRect && cvs.current) {
        const ctx = cvs.current.getContext("2d");
        if (ctx) {
          const {x, y, w, h} = targetRect;
          const imgData2 = ctx.getImageData(x, y, w, h);
          ctx.clearRect(x, y, w, h);
          imgDatas.push({
            info: targetRect,
            data: imgData2
          });
        }
      }
    }
  }
  function handleDownload() {
    if (cvs.current && imgData.url) {
      cvs.current.toBlob((blob) => {
        const anchor = document.createElement("a");
        anchor.download = imgData.name;
        anchor.href = URL.createObjectURL(blob);
        anchor.click();
        URL.revokeObjectURL(anchor.href);
      });
    }
  }
  let timer;
  function handleResize() {
    if (timer) {
      console.log("clear timeout");
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (cvs.current) {
        setScale(cvs.current.getBoundingClientRect().width / imgData.width);
      }
    }, 500);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  function onClickItem(e) {
    const {id, set} = e.currentTarget.dataset;
    if (id && set) {
      onSelect({item: id, set});
    }
  }
  let list = [];
  if (imgData.url) {
    altasData.forEach((d) => d.atlasList.forEach(({name, x, y, w, h}) => {
      const style = {
        width: w * scale,
        height: h * scale,
        left: x * scale,
        top: y * scale
      };
      list.push(/* @__PURE__ */ React.createElement("div", {
        className: `img-viewer__item ${name === selectedAtlasItem && d.set === selectedAtlasSet ? "selected" : ""}`,
        style,
        key: name,
        "data-set": d.set,
        "data-id": name,
        onClick: onClickItem
      }));
    }));
  }
  console.log("background class:", backgroundClassName[currentBackgournd]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `img-viewer ${backgroundClassName[currentBackgournd]}`
  }, /* @__PURE__ */ React.createElement("button", {
    className: "img-viewer__delete",
    onClick: handleDelete
  }, "Delete Selected"), /* @__PURE__ */ React.createElement("button", {
    className: "img-viewer__download",
    onClick: handleDownload
  }, "Download Image"), /* @__PURE__ */ React.createElement("canvas", {
    width: imgData.width,
    height: imgData.height,
    ref: cvs
  }), list);
}
