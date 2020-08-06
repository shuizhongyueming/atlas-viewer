import React, { useReducer } from 'react';
import './App.css';
import { FileInput } from './FileInput';
import { PresetSelect } from './PresetSelect';
import { KeyPahtInfoInput } from './KeyPathInfoInput';
import { ImgViewer } from './ImgViewer';
import { reducer, initState, Actions } from './store';
import { AtlasList } from './AtlasList';

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div className="App">
      <PresetSelect
        selectedPreset={state.selectedPreset}
        presetList={state.presets}
        onChange={(preset) =>
          dispatch({ type: Actions.SET_PRESET, data: preset })
        }
      />
      <FileInput
        onAltasChange={(altasData) =>
          dispatch({ type: Actions.SET_ALTAS_DATA, data: altasData })
        }
        onImageChange={(imgData) =>
          dispatch({ type: Actions.SET_IMG_DATA, data: imgData })
        }
      />
      <KeyPahtInfoInput
        data={state.keyPathInfo}
        onChange={(d) => dispatch({ type: Actions.UPDATE_PRESET, data: d })}
      />
      <div className="content">
        <ImgViewer
          imgData={state.imgData}
          altasData={state.altasData}
          keyPathInfo={state.keyPathInfo}
          selectedAtlasItem={state.selectedAtlasItem}
          onSelect={(n) =>
            dispatch({ type: Actions.SET_SELECTED_ALTAS_ITEM, data: n })
          }
        />
        <AtlasList
          atlasData={state.altasData}
          keyPathInfo={state.keyPathInfo}
          selectedAtlasItem={state.selectedAtlasItem}
          onSelect={(n) =>
            dispatch({ type: Actions.SET_SELECTED_ALTAS_ITEM, data: n })
          }
        />
      </div>
    </div>
  );
}

export default App;
