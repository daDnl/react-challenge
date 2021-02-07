import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { Toolbar } from './components/Toolbar';
import { UserList } from './components/UserList';
import { ActiveUser } from './components/ActiveUser';


export const App = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const [activeUserData, setActiveUserData] = useState(null);

  const [sortParam, setSortParam] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [filter, setFilter] = useState('');

  const selectUser = useCallback((id) => {
    setActiveUserData(users.find(user => user.id == id));
  });

  const handleSearchChange = useCallback((e) => {
    setFilter(e.target.value);
  });

  useEffect(() => {
    fetch(`http://${window.location.host}/data.json`)
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result);
          setActiveUserData(result[0]);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);


  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="container app">
        <SearchBar value={filter} onChange={handleSearchChange} />
        <Toolbar />
        <div className="row">
          <UserList users={users} sort={ { param: sortParam, order: sortOrder } } filter={filter} activeUser={activeUserData} selectUser={selectUser} />
          <ActiveUser user={activeUserData} />
        </div>
      </div>
    );
  }

  
}