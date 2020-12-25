import React, { useState } from 'react';
import './PresetSelect.css';

export interface PresetSelectProps {
  selectedPreset: string;
  presetList: string[];
  onChange: (preset: string) => void;
  handleAddPresetName: (presetName: string) => void;
}

export function PresetSelect({
  selectedPreset,
  presetList,
  onChange,
  handleAddPresetName,
}: PresetSelectProps) {
  const [isAddingPreset, updateIsAddingPreset] = useState(false);
  const [presetName, updatePresetName] = useState('');

  function handeClicked(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { id } = e.currentTarget.dataset;
    if (id) {
      onChange(id);
    }
  }
  const list = presetList.map((n) => (
    <li
      key={n}
      data-id={n}
      className={n === selectedPreset ? 'presets__selected' : ''}
      onClick={handeClicked}
    >
      {n}
    </li>
  ));
  return (
    <div className="presets">
      <span className="presets__title">Presets: </span>
      <ul className="presets__list">{list}</ul>
      {!isAddingPreset ? (
        <button onClick={() => updateIsAddingPreset(true)}>Add Preset</button>
      ) : (
        <>
          <input
            value={presetName}
            onChange={(e) => updatePresetName(e.target.value.trim())}
            placeholder="Preset Name"
          />
          <button
            onClick={() => {
              handleAddPresetName(presetName);
              updatePresetName('');
              updateIsAddingPreset(false);
            }}
          >
            Submit
          </button>
          <button onClick={() => updateIsAddingPreset(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
