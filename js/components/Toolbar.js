import React, { useEffect, useState } from 'react';
import { SortButton } from './SortButton';


export const Toolbar = (props) => {
  const { sortParam, sortOrder, onSortChange } = props;

  return (
    <div className="btn-toolbar p-0 form-control rounded-top" role="toolbar" aria-label="Sort and range filter bar">
      <div className="btn-group btn-broup-lg border-0 w-auto" role="group" aria-label="Sort buttons">
        {sortParam === 'name' ? 
          <SortButton 
            active={true} 
            order={sortOrder}
            param="name"
            onSortClick={onSortChange} 
            type="string" 
            label="Sort by name"/> :
          <SortButton
            active={false}
            order="asc"
            param="name"
            onSortClick={onSortChange}
            type="string"
            label="Sort by name" />
        }
        {sortParam === 'age' ?
          <SortButton
            active={true}
            order={sortOrder}
            param="age"
            onSortClick={onSortChange}
            type="num"
            label="Sort by age" /> :
          <SortButton
            active={false}
            order="asc"
            param="age"
            onSortClick={onSortChange}
            type="num"
            label="Sort by age" />
        }
      </div>
    </div>
  )
}