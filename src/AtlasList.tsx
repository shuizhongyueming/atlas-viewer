import React, { useState } from 'react';
import { getValueWithKeyPath } from './utils';
import type { Atlas, State } from './store';
import './AtlasList.css';

export interface AtlasListProps {
  atlasData: Atlas[];
  selectedAtlasSet: string;
  selectedAtlasItem: string;
  onSelect: (p: { item: string; set: string }) => void;
}

export function AtlasList({
  atlasData,
  selectedAtlasSet,
  selectedAtlasItem,
  onSelect,
}: AtlasListProps) {
  function onClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { id, set } = e.currentTarget.dataset;
    if (id && set) {
      onSelect({ item: id, set });
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
            data-set={set}
            onClick={onClick}
            className={
              selectedAtlasItem === name && selectedAtlasSet === set
                ? 'atlas-list__selected'
                : ''
            }
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
