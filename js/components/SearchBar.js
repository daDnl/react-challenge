import React, { useCallback } from 'react';


export const SearchBar = (props) => {

  return (
      <input type="text" className="form-control form-control-lg mb-3 p-3" placeholder="Search in here..." aria-label="Search in here..." aria-describedby="basic-addon2"
        value={props.value} onChange={props.onChange} />
  )
}