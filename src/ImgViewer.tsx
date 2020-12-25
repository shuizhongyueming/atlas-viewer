import React, { useState, useRef, useEffect, ReactElement } from 'react';
import type { Atlas, State } from './store';
import './ImgViewer.css';
import { getValueWithKeyPath } from './utils';

export interface ImgViewerProps {
  imgData: State['imgData'];
  atlasData: Atlas[];
  selectedAtlasItem: string;
  onSelect: (itemKey: string) => void;
}
export function ImgViewer({
  imgData,
  atlasData: altasData,
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
  console.log({ list });

  return (
    <div className="img-viewer">
      <img src={imgData.url} ref={img} />
      {list}
    </div>
  );
}
