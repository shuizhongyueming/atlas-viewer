import React, { useReducer } from 'react';
import './App.css';
import { FileInput } from './FileInput';
import { PresetSelect } from './PresetSelect';
import { reducer, initState, Actions } from './store';

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div className="App">
      <FileInput
        onAltasChange={(altasData) =>
          dispatch({ type: Actions.SET_ALTAS_DATA, data: altasData })
        }
        onImageChange={(imgData) =>
          dispatch({ type: Actions.SET_IMG_DATA, data: imgData })
        }
      />
      <PresetSelect
        selectedPreset={state.selectedPreset}
        presetList={state.presets}
        onChange={(preset) =>
          dispatch({ type: Actions.SET_PRESET, data: preset })
        }
      />
    </div>
  );
}

export default App;
