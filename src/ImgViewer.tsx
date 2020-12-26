import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { Atlas, BackgroundType, State } from './store';
import './ImgViewer.css';

export interface ImgViewerProps {
  imgData: State['imgData'];
  atlasData: Atlas[];
  atlasFileName: string;
  selectedAtlasSet: string;
  selectedAtlasItem: string;
  currentBackgournd: BackgroundType;
  onSelect: (p: { item: string; set: string }) => void;
}

const backgroundClassName = {
  [BackgroundType.Transparent]: 'transparent',
  [BackgroundType.Dark]: 'dark',
  [BackgroundType.Light]: 'light',
};

export function ImgViewer({
  imgData,
  atlasData: altasData,
  atlasFileName,
  selectedAtlasSet,
  selectedAtlasItem,
  currentBackgournd,
  onSelect,
}: ImgViewerProps) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (cvs.current) {
      const img = new Image();
      img.onload = () => {
        if (cvs.current) {
          const ctx = cvs.current.getContext('2d');
          ctx?.drawImage(img, 0, 0);
        }
      };
      img.src = imgData.url;
      if (cvs.current) {
        setScale(cvs.current.getBoundingClientRect().width / imgData.width);
      }
    }
  }, [imgData]);

  function handleKeyDown(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key === 'Backspace') {
      handleDelete();
    }
  }

  function handleDelete() {
    const targetSet = altasData.find((n) => n.set === selectedAtlasSet);
    if (targetSet) {
      const targetRect = targetSet.atlasList.find(
        (n) => n.name === selectedAtlasItem,
      );
      if (targetRect && cvs.current) {
        const ctx = cvs.current.getContext('2d');
        const { x, y, w, h } = targetRect;
        ctx?.clearRect(x, y, w, h);
      }
    }
  }

  function handleDownload() {
    if (cvs.current && imgData.url) {
      cvs.current.toBlob((blob) => {
        const anchor = document.createElement('a');
        anchor.download = imgData.name;
        anchor.href = URL.createObjectURL(blob);
        anchor.click();
        URL.revokeObjectURL(anchor.href);
      });
    }
  }

  let timer: NodeJS.Timeout;
  function handleResize() {
    if (timer) {
      console.log('clear timeout');
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (cvs.current) {
        // console.log('img.current.width', cvs.current.width);
        // setScale(cvs.current.width / imgData.width);
        setScale(cvs.current.getBoundingClientRect().width / imgData.width);
      }
    }, 500);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function onClickItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id, set } = e.currentTarget.dataset;
    if (id && set) {
      onSelect({ item: id, set });
    }
  }

  let list: ReactElement[] = [];
  if (imgData.url) {
    altasData.forEach((d) =>
      d.atlasList.forEach(({ name, x, y, w, h }) => {
        const style = {
          width: w * scale,
          height: h * scale,
          left: x * scale,
          top: y * scale,
        };
        list.push(
          <div
            className={`img-viewer__item ${
              name === selectedAtlasItem && d.set === selectedAtlasSet
                ? 'selected'
                : ''
            }`}
            style={style}
            key={name}
            data-set={d.set}
            data-id={name}
            onClick={onClickItem}
          ></div>,
        );
      }),
    );
  }
  console.log('background class:', backgroundClassName[currentBackgournd]);

  return (
    <div className={`img-viewer ${backgroundClassName[currentBackgournd]}`}>
      <button className="img-viewer__delete" onClick={handleDelete}>
        Delete Selected
      </button>
      <button className="img-viewer__download" onClick={handleDownload}>
        Download Image
      </button>
      <canvas width={imgData.width} height={imgData.height} ref={cvs} />
      {/* <img src={imgData.url} ref={cvs} /> */}
      {list}
    </div>
  );
}
