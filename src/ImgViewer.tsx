import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { Atlas, BackgroundType, State } from './store';
import './ImgViewer.css';
import { getValueWithKeyPath } from './utils';

export interface ImgViewerProps {
  imgData: State['imgData'];
  atlasData: Atlas[];
  selectedAtlasItem: string;
  currentBackgournd: BackgroundType;
  onSelect: (itemKey: string) => void;
}

const backgroundClassName = {
  [BackgroundType.Transparent]: 'transparent',
  [BackgroundType.Dark]: 'dark',
  [BackgroundType.Light]: 'light',
};

export function ImgViewer({
  imgData,
  atlasData: altasData,
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
    return () => window.removeEventListener('resize', handleResize);
  });

  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id } = e.currentTarget.dataset;
    if (id) {
      onSelect(id);
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
              name === selectedAtlasItem ? 'selected' : ''
            }`}
            style={style}
            key={name}
            data-id={name}
            onClick={onClick}
          ></div>,
        );
      }),
    );
  }
  console.log('background class:', backgroundClassName[currentBackgournd]);

  return (
    <div className={`img-viewer ${backgroundClassName[currentBackgournd]}`}>
      <canvas width={imgData.width} height={imgData.height} ref={cvs} />
      {/* <img src={imgData.url} ref={cvs} /> */}
      {list}
    </div>
  );
}
