import React from 'react';
import type { KeyPathInfo } from './store';
import './KeyPathInfoInput.css';

export interface KeyPahtInfoInputProps {
  data: KeyPathInfo;
  onChange: (data: KeyPathInfo) => void;
}

export function KeyPahtInfoInput({ data, onChange }: KeyPahtInfoInputProps) {
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    onChange({
      ...data,
      [name]: value,
    });
  }
  const list = Object.entries(data).map(([k, v]) => (
    <div className="key-path-info__item" key={k}>
      <label htmlFor={`key-path-info__${k}`}>{k}：</label>
      <input
        name={k}
        placeholder={k}
        value={v}
        onChange={handleChange}
        type="text"
      />{' '}
    </div>
  ));
  return (
    <div className="key-path-info">
      <div className="key-path-info__title">Key Path Config: </div>
      <div className="key-path-info__list">{list}</div>
    </div>
  );
}
