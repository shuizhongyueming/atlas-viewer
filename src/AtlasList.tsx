import React, { useState } from 'react';
import { getValueWithKeyPath } from './utils';
import type { State } from './store';
import './AtlasList.css';

export interface AtlasListProps {
  atlasData: any;
  keyPathInfo: State['keyPathInfo'];
  selectedAtlasItem: string;
  onSelect: (n: string) => void;
}

export function AtlasList({
  atlasData,
  keyPathInfo,
  selectedAtlasItem,
  onSelect,
}: AtlasListProps) {
  function onClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { id } = e.currentTarget.dataset;
    if (id) {
      onSelect(id);
    }
  }
  let list: React.ReactElement[] = [];
  if (atlasData[keyPathInfo.set]) {
    list = Object.entries(atlasData[keyPathInfo.set])
      .map((n) => getValueWithKeyPath(n, keyPathInfo.name))
      .map((n) => (
        <li
          key={n}
          data-id={n}
          onClick={onClick}
          className={selectedAtlasItem === n ? 'atlas-list__selected' : ''}
        >
          {n}
        </li>
      ));
  }
  return (
    <div className="atlas-list">
      <div className="atlas-list__title">Altas List</div>
      <ul className="atlas-list__list">{list}</ul>
    </div>
  );
}
