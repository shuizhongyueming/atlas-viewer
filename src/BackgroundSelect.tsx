import React, { useState } from 'react';
import { BackgroundType } from './store';
import './BackgroundSelect.css';

export interface BackgroundSelectProps {
  background: BackgroundType;
  onChange: (b: BackgroundType) => void;
}

const backgournds: { [key: string]: BackgroundType } = {
  Transparent: BackgroundType.Transparent,
  Dark: BackgroundType.Dark,
  Light: BackgroundType.Light,
};

export function BackgroundSelect({
  background,
  onChange,
}: BackgroundSelectProps) {
  return (
    <div className="background-select">
      <div className="background-select__title">Background:</div>
      <ul className="background-select__list">
        {Object.entries(backgournds).map(([k, v]) => (
          <li
            key={k}
            data-id={k}
            className={background === v ? 'background-select__selected' : ''}
            onClick={(e) => {
              const { id } = e.currentTarget?.dataset;
              console.log('id: ', id);
              if (id && typeof backgournds[id] !== 'undefined') {
                console.log('id: ', id, backgournds[id]);
                onChange(backgournds[id]);
              }
            }}
          >
            {k}
          </li>
        ))}
      </ul>
    </div>
  );
}
