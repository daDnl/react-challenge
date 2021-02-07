import React, { useCallback } from 'react';


export const SearchBar = (props) => {

  return (
    <input className="col" type="text" value={props.value} onChange={props.onChange} />
  )
}