import React, { useReducer } from 'react';
import './App.css';
import { FileInput } from './FileInput';
import { reducer, initState, Actions } from './store';

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div className="App">
      <div className="presets">
        <FileInput
          onAltasChange={(altasData) =>
            dispatch({ type: Actions.SET_ALTAS_DATA, data: altasData })
          }
          onImageChange={(imgData) =>
            dispatch({ type: Actions.SET_IMG_DATA, data: imgData })
          }
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
