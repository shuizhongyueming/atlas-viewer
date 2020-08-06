import React, { useState } from 'react';
import type { State } from './store';
import './ImgViewer.css';

export interface ImgViewerProps {
  imgData: State['imgData'];
  altasData: {};
  selectedAtlasItem: string;
  keyPathInfo: State['keyPathInfo'];
  onSelect: (itemKey: string) => void;
}
export function ImgViewer({
  imgData,
  altasData,
  keyPathInfo,
  onSelect,
}: ImgViewerProps) {
  const [displaySize, updateDisplaySize] = useState({
    width: 0,
    height: 0,
  });

  return (
    <div className="img-viewer">
      <img src={imgData.url} />
    </div>
  );
}
