import React, { ChangeEvent } from 'react';

interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

export interface FileInputProps {
  onImageChange(imgData: ImageInfo): void;
  onAltasChange(altasData: string): void;
}

function getImageInfo(file: any, cb: (data: ImageInfo) => void) {
  const url = window.URL.createObjectURL(file);
  const img = new Image();
  img.onload = function () {
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;

    cb({ url, width, height });
  };
  img.src = url;
}

function getAltasContent(file: any, cb: (content: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', function () {
    cb(reader.result as string);
  });
  reader.readAsText(file);
}

export function FileInput({ onImageChange, onAltasChange }: FileInputProps) {
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (file) {
      getImageInfo(file, onImageChange);
    }
  }

  function handleAltasChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (file) {
      getAltasContent(file, onAltasChange);
    }
  }

  return (
    <div className="fileInput">
      <div className="fileInput__item">
        <span className="fileInput__name">图片：</span>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="fileInput__item">
        <span className="fileInput__name">配置：</span>
        <input type="file" onChange={handleAltasChange} />
      </div>
    </div>
  );
}
