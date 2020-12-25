import ReactJson from 'react-json-view';
import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { emptyPrest, PresetFunc } from './store';
import { generatePresetFunc } from './utils';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './JSONViewer.css';

export interface JSONViewerProps {
  json: {};
  presetBody: string;
  presetFunc: PresetFunc;
  onChange: (body: string) => void;
}

var presetFunc = emptyPrest;

export function JSONViewer(props: JSONViewerProps) {
  const { json, presetBody, onChange } = props;
  const [isPreview, updatePreviewState] = useState(false);
  const [errMsg, updateErrMsg] = useState('');
  const [funcBody, updateFuncBody] = useState(presetBody);
  const [data, updateData] = useState(json);

  useEffect(() => {
    updateFuncBody(presetBody);
  }, [presetBody]);

  function previewData() {
    try {
      presetFunc = generatePresetFunc(funcBody);
      updateData(presetFunc(json));
      console.log('update data: ', data);
    } catch (e) {
      updateErrMsg(e.message);
    }
  }

  return (
    <div className="json-viewer">
      <div className="json-viewer__left">
        {errMsg && <p>Error: {errMsg}</p>}
        <ReactJson
          src={data}
          indentWidth={2}
          collapsed={2}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
        ></ReactJson>
      </div>
      <div className="json-viewer__middle">
        <button onClick={previewData} disabled={isPreview}>
          Preview
        </button>
        <button
          disabled={presetBody === funcBody}
          onClick={() => onChange(funcBody)}
        >
          Submit
        </button>

        <p>Make a function to transfer atlasData to structure of:</p>
        <pre>
          <code>
            {`
        {
          set: string;
          atlasList: Array<{
            name: string,
            x: number,
            y: number,
            w: number,
            h: number
          }>
        }`}
          </code>
        </pre>
        <p>or a list of that structure.</p>
      </div>
      <div className="json-viewer__right">
        <AceEditor
          placeholder="Placeholder Text"
          mode="javascript"
          theme="solarized_light"
          name="blah2"
          onChange={(v) => {
            updateFuncBody(v);
            updatePreviewState(false);
          }}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={funcBody}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
