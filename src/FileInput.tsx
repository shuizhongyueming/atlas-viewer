import React, { ChangeEvent } from 'react';
import './FileInput.css';

interface ImageInfo {
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface FileInputProps {
  onImageChange(imgData: ImageInfo): void;
  onAltasChange(p: { name: string; content: string }): void;
}

function getImageInfo(file: File, cb: (data: ImageInfo) => void) {
  const url = window.URL.createObjectURL(file);
  const img = new Image();
  img.onload = function () {
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;

    cb({ url, width, height, name: file.name });
  };
  img.src = url;
}

function getAltasContent(file: File, cb: FileInputProps['onAltasChange']) {
  const reader = new FileReader();
  reader.addEventListener('load', function () {
    cb({ name: file.name, content: reader.result as string });
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
      console.log(file);
      getAltasContent(file, onAltasChange);
    }
  }

  return (
    <div className="fileInput">
      <div className="fileInput__item">
        <span className="fileInput__name">Image: </span>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="fileInput__item">
        <span className="fileInput__name">Config: </span>
        <input type="file" onChange={handleAltasChange} />
      </div>
    </div>
  );
}
