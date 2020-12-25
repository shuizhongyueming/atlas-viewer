import ReactJson from 'react-json-view';
import React, { useEffect, useState } from 'react';
import { emptyPrest, PresetFunc } from './store';
import { generatePresetFunc } from './utils';
import './JSONViewer.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

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
        <Editor
          value={funcBody}
          onValueChange={(code) => {
            updateFuncBody(code);
            updatePreviewState(false);
          }}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
        />
        {/* <AceEditor
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
        /> */}
      </div>
    </div>
  );
}
