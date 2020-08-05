import React from 'react';
import './App.css';
import { FileInput } from './FileInput';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <div className="presets">
        <FileInput
          onAltasChange={(altasData) => console.log(altasData)}
          onImageChange={(imgData) => console.log(imgData)}
        />
        <span className="presets__title">预设</span>
        <ul className="presets__list">
          <li>Laya</li>
          <li>Egret</li>
          <li>Custom</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
