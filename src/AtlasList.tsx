import React, { useState } from 'react';
import { getValueWithKeyPath } from './utils';
import type { Atlas, State } from './store';
import './AtlasList.css';

export interface AtlasListProps {
  atlasData: Atlas[];
  selectedAtlasItem: string;
  onSelect: (n: string) => void;
}

export function AtlasList({
  atlasData,
  selectedAtlasItem,
  onSelect,
}: AtlasListProps) {
  function onClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { id } = e.currentTarget.dataset;
    if (id) {
      onSelect(id);
    }
  }
  let list: React.ReactElement[] = atlasData.map(({ set, atlasList }) => (
    <div className="atlas-set" key={set}>
      <div className="atlas-set__title">{set}</div>
      <ul className="atlas-list__list">
        {atlasList.map(({ name }) => (
          <li
            key={name}
            data-id={name}
            onClick={onClick}
            className={selectedAtlasItem === name ? 'atlas-list__selected' : ''}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  ));
  return (
    <div className="atlas-list">
      <div className="atlas-list__title">Altas List</div>
      <div className="atlas-list__content">{list}</div>
    </div>
  );
}
