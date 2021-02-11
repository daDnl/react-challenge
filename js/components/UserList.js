import React, { useEffect, useState } from 'react';
import { UserData } from './UserData';


export const UserList = (props) => {
  const { users, sortParam, sortOrder, filter, selectUser, activeUser } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [userList, setUserList] = useState(users);


  const filterUsers = (users, query) => {
    const nums = query.match(/\d+/g);
    if (nums) {
      users = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
        || user.phone.match(/\d+/g).join('').includes(nums.join(''))
      );
    } else {
      users = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return users;
  }

  const sortUsers = (users, sortParam, sortOrder) => {
    console.log('sort users called')
    if(sortParam === 'name') {
      return sortOrder === 'asc' ? users.sort((a, b) => a.name.localeCompare(b.name)) :
        users.sort((a, b) => b.name.localeCompare(a.name)) ;
    } else if(sortParam === 'age') {
      return sortOrder === 'asc' ? users.sort((a, b) => parseFloat(a.age) - parseFloat(b.age)) :
        users.sort((a, b) => parseFloat(b.age) - parseFloat(a.age));
    }
  }

  const handleUserClick = (id) => {
    selectUser(id);
  }

  useEffect(() => {
    let tmpUserList = [];
    if(filter) {
      const isUserInList = userList.find(user => user.id == activeUser.id);
      tmpUserList = filterUsers(users, filter);
      if(!isUserInList) {
        const [firstUser] = userList;
        selectUser(firstUser.id);
      }
    } else {
      tmpUserList = users;
    }
    
    
    if(sortOrder && sortParam) {
      tmpUserList = sortUsers(tmpUserList, sortParam, sortOrder);
    }
    
    setUserList([...tmpUserList]);
    setIsLoaded(true);
  }, [users, sortParam, sortOrder, filter, activeUser]);
  
  if(!isLoaded) {
    return <div>Загрузка...</div>;
  } else {

    return (
      <div className="col-8 list-group rounded-0">
        {userList.map((user) =>
          <UserData
            key={user.id.toString()}
            id={user.id}
            name={user.name}
            age={user.age}
            phone={user.phone}
            image={user.image}
            onUserClick={handleUserClick}
            selected={user.id === activeUser.id}
          />
        )}
      </div>
    )
  }
}