import React, { useState, useRef, useEffect, ReactElement } from 'react';
import type { State } from './store';
import './ImgViewer.css';
import { getValueWithKeyPath } from './utils';

export interface ImgViewerProps {
  imgData: State['imgData'];
  altasData: any;
  selectedAtlasItem: string;
  keyPathInfo: State['keyPathInfo'];
  onSelect: (itemKey: string) => void;
}
export function ImgViewer({
  imgData,
  altasData,
  keyPathInfo,
  selectedAtlasItem,
  onSelect,
}: ImgViewerProps) {
  const img = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (img.current) {
      img.current.onload = () => {
        if (img.current?.width) {
          setScale(img.current.width / imgData.width);
        }
      };
    }
  }, [imgData]);

  let timer: NodeJS.Timeout;
  function handleResize() {
    if (timer) {
      console.log('clear timeout');
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (img.current?.width) {
        console.log('img.current.width', img.current.width);
        setScale(img.current.width / imgData.width);
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
  if (altasData[keyPathInfo.set] && imgData.url) {
    list = Object.entries(altasData[keyPathInfo.set])
      .map((n) => ({
        name: getValueWithKeyPath(n, keyPathInfo.name),
        x: getValueWithKeyPath(n, keyPathInfo.x) * scale,
        y: getValueWithKeyPath(n, keyPathInfo.y) * scale,
        w: getValueWithKeyPath(n, keyPathInfo.w) * scale,
        h: getValueWithKeyPath(n, keyPathInfo.h) * scale,
      }))
      .map(({ name, x, y, w, h }) => {
        console.log({ name, x, y, w, h });
        const style = {
          width: w,
          height: h,
          left: x,
          top: y,
        };
        return (
          <div
            className={`img-viewer__item ${
              name === selectedAtlasItem ? 'selected' : ''
            }`}
            style={style}
            key={name}
            data-id={name}
            onClick={onClick}
          ></div>
        );
      });
  }

  return (
    <div className="img-viewer">
      <img src={imgData.url} ref={img} />
      {list}
    </div>
  );
}
