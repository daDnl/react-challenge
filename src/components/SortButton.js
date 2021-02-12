import React, { useEffect, useState } from 'react';
import { Loading } from './Loading'


export const SortButton = (props) => {
    const { active, order, param, onSortClick, type, label, showLoading } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [labelFromTo, setlabelFromTo] = useState(null);

    const className = 'btn btn-secondary border-0 rounded-0';

    const handleClick = (e) => {
      const sortParams = e.currentTarget.dataset;
      onSortClick(sortParams.sortOrder, sortParams.sortParam);
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
      setIsLoaded(true);
      
    }, [order, type, active]);

    if(isLoaded) {
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
    } else {
      return <Loading />
    }
}