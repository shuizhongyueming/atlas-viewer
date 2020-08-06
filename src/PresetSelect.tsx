import React from 'react';
import './PresetSelect.css';

export interface PresetSelectProps {
  selectedPreset: string;
  presetList: string[];
  onChange: (preset: string) => void;
}

export function PresetSelect({
  selectedPreset,
  presetList,
  onChange,
}: PresetSelectProps) {
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
      <span className="presets__title">预设：</span>
      <ul className="presets__list">{list}</ul>
    </div>
  );
}
