import React from 'react';
import { useSelector } from 'react-redux';
import { SortButton } from './SortButton';


export const Toolbar = (props) => {
  const sort = props.sort;

  return (
    <div className="btn-toolbar p-0 form-control rounded-top" role="toolbar" aria-label="Sort and range filter bar">
      <div className="btn-group btn-broup-lg border-0 w-auto" role="group" aria-label="Sort buttons">
        {sort.param === 'name' ? 
          <SortButton 
            active={true} 
            order={sort.order}
            param="name"
            type="string" 
            label="Sort by name"/> :
          <SortButton
            active={false}
            order="asc"
            param="name"
            type="string"
            label="Sort by name" />
        }
        {sort.param === 'age' ?
          <SortButton
            active={true}
            order={sort.order}
            param="age"
            type="num"
            label="Sort by age" /> :
          <SortButton
            active={false}
            order="asc"
            param="age"
            type="num"
            label="Sort by age" />
        }
      </div>
    </div>
  )
}