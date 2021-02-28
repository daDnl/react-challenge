import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterChange
} from './users/usersSlice';

export const SearchBar = (props) => {
  const dispatch = useDispatch();
  const filter = props.filter;

  const handleSearchChange = useCallback((e) => {
    dispatch(filterChange(e.target.value));
  });

  return (
      <input type="text" className="form-control form-control-lg mb-3 p-3" placeholder="Search in here..." aria-label="Search in here..." aria-describedby="basic-addon2"
        value={filter} onChange={handleSearchChange} />
  )
}