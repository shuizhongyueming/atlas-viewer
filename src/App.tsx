import React, { useEffect, useReducer } from 'react';
import './App.css';
import { FileInput } from './FileInput';
import { PresetSelect } from './PresetSelect';
import { KeyPahtInfoInput } from './KeyPathInfoInput';
import { ImgViewer } from './ImgViewer';
import { reducer, initState, Actions, Atlas } from './store';
import { AtlasList } from './AtlasList';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.css';
import { JSONViewer } from './JSONViewer';

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  let atlas: Atlas[] = [];
  // useEffect(() => {
  try {
    const data = state.currentPresetFunc(state.altasData);
    if (!Array.isArray(data)) {
      atlas = [data];
    } else {
      atlas = data;
    }
    console.log('update atlas: ', atlas);
  } catch (e) {
    console.log('update atlas failed: ', e.message);
  }
  // }, [state.currentPresetFunc, state.altasData, state.imgData]);
  return (
    <div className="App">
      <PresetSelect
        selectedPreset={state.selectedPreset}
        presetList={Object.keys(state.presetMap)}
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
      <div className="content">
        <Tabs>
          <TabPane tab="Image" key="1">
            <ImgViewer
              imgData={state.imgData}
              atlasData={atlas}
              selectedAtlasItem={state.selectedAtlasItem}
              onSelect={(n) =>
                dispatch({ type: Actions.SET_SELECTED_ALTAS_ITEM, data: n })
              }
            />
            <AtlasList
              atlasData={atlas}
              selectedAtlasItem={state.selectedAtlasItem}
              onSelect={(n) =>
                dispatch({ type: Actions.SET_SELECTED_ALTAS_ITEM, data: n })
              }
            />
          </TabPane>
          <TabPane tab="JSON" key="2">
            <div className="json-content">
              <JSONViewer
                json={state.altasData}
                presetBody={state.presetMap[state.selectedPreset]}
                presetFunc={state.currentPresetFunc}
                onChange={(d) =>
                  dispatch({ type: Actions.UPDATE_PRESET, data: d })
                }
              ></JSONViewer>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
