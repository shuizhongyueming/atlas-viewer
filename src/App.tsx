import React, { useReducer } from 'react';
import './App.css';
import { FileInput } from './FileInput';
import { PresetSelect } from './PresetSelect';
import { ImgViewer } from './ImgViewer';
import { reducer, initState, Actions, Atlas } from './store';
import { AtlasList } from './AtlasList';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.css';
import { JSONViewer } from './JSONViewer';
import { BackgroundSelect } from './BackgroundSelect';

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  let atlas: Atlas[] = [];
  try {
    const data = state.currentPresetFunc(state.atlasData);
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
      <div className="head-actions">
        <div className="head-actions__left">
          <PresetSelect
            selectedPreset={state.selectedPreset}
            presetList={Object.keys(state.presetMap)}
            onChange={(preset) =>
              dispatch({ type: Actions.SET_PRESET, data: preset })
            }
            handleAddPresetName={(presetName) =>
              dispatch({ type: Actions.ADD_PRESET, data: presetName })
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
        </div>
        <div className="head-actions__right">
          <BackgroundSelect
            background={state.currentBackgournd}
            onChange={(b) =>
              dispatch({ type: Actions.SET_BACKGROUND, data: b })
            }
          />
        </div>
      </div>
      <div className="content">
        <Tabs>
          <TabPane tab="Image" key="1">
            <ImgViewer
              imgData={state.imgData}
              atlasData={atlas}
              atlasFileName={state.atlasFileName}
              currentBackgournd={state.currentBackgournd}
              selectedAtlasSet={state.selectedAtlasSet}
              selectedAtlasItem={state.selectedAtlasItem}
              onSelect={(n) =>
                dispatch({ type: Actions.SET_SELECTED_ALTAS_ITEM, data: n })
              }
            />
            <AtlasList
              atlasData={atlas}
              selectedAtlasSet={state.selectedAtlasSet}
              selectedAtlasItem={state.selectedAtlasItem}
              onSelect={(n) =>
                dispatch({ type: Actions.SET_SELECTED_ALTAS_ITEM, data: n })
              }
            />
          </TabPane>
          <TabPane tab="JSON" key="2">
            <div className="json-content">
              <JSONViewer
                json={state.atlasData}
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
