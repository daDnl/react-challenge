import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { Toolbar } from './Toolbar';
import { UserList } from './UserList';
import { ActiveUser } from './ActiveUser';
import { Loading } from './Loading';
import { useParams, useHistory } from "react-router-dom";


export const TableSortSearch = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const [urlParams, setUrlParams] = useState(useParams());
  const history = useHistory();

  const [activeUserData, setActiveUserData] = useState(null);

  const [sortOrder, setSortOrder] = useState(null);
  const [sortParam, setSortParam] = useState(null);

  const [filter, setFilter] = useState('');

  

  const selectUser = useCallback((id) => {
    setActiveUserData(users.find(user => user.id == id));
  });

  const handleSearchChange = useCallback((e) => {
    setFilter(e.target.value);
  });

  const handleSortChange = useCallback((order, param) => {
    if (sortOrder) {
      setSortOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder(order);
    }
    setSortParam(param);
  });

  useEffect(() => {
    fetch(`http://${window.location.host}/data.json`)
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result);
          if (urlParams) {
            if (urlParams.active) {
              setActiveUserData(result.find(user => user.id == urlParams.active));
            } else {
              setActiveUserData(result[0]);
            }
            if (urlParams.search) {
              setFilter(urlParams.search);
            }
            if (urlParams.sort) {
              const [param, order] = urlParams.sort.split('-');
              setSortParam(param);
              setSortOrder(order);
            }
          }
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (filter && sortParam && sortOrder) {
        history.push(`/${filter}/${sortParam}-${sortOrder}/${activeUserData.id}`);
      } else if (filter && (!sortParam || !sortOrder)) {
        history.push(`/search/${filter}/${activeUserData.id}`);
      } else if (!filter && (sortParam && sortOrder)) {
        history.push(`/sort/${sortParam}-${sortOrder}/${activeUserData.id}`);
      } else if (activeUserData){
        history.push(`/${activeUserData.id}`);
      }
    }
  }, [urlParams, history, filter, sortParam, sortOrder, activeUserData]);


  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <div className="container app">
        
        <div className="row">
          <SearchBar value={filter} onChange={handleSearchChange} />
        </div>

        <div className="row">
          <Toolbar sortParam={sortParam} sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div >
          
        <div className="row">
          <UserList users={users} sortParam={sortParam} sortOrder={sortOrder} filter={filter} activeUser={activeUserData} selectUser={selectUser} />
          <ActiveUser user={activeUserData} />
        </div>
      </div>
    );
  }

  
}