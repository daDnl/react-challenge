import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  toggleSort
} from '../users/usersSlice';

export const SortButton = (props) => {
    const { active, order, param, type, label } = props;
    const [labelFromTo, setlabelFromTo] = useState(null);

    const dispatch = useDispatch();

    const className = 'btn btn-secondary border-0 rounded-0';

    const handleClick = (e) => {
      const { sortOrder, sortParam } = e.currentTarget.dataset;
      dispatch(toggleSort({sortOrder, sortParam}));
    }

    useEffect(() => {
      switch(type) {
        case 'num':
          setlabelFromTo(order === 'asc' ? '19' : '91');
          break;
        case 'string':
          setlabelFromTo(order === 'asc' ? 'AZ' : 'ZA');
          break;
      }
    }, [order, type, active]);

    return (
      <button
        type="button"
        className={active ? className + ' btn-active' : className}
        data-sort-order={order}
        data-sort-param={param}
        onClick={handleClick}>
      
        <p className="vertical-text">{labelFromTo}</p>
        <span>{label}</span>
        <span className="arrow-icon">{order === 'asc' ? '↑' : '↓'}</span>
      </button>
    )
}