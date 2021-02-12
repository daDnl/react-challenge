import React, { useEffect, useState } from 'react';
import { UserData } from './UserData';
import { Loading } from './Loading'


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
      tmpUserList = filterUsers(users, filter);

      const isUserInList = tmpUserList.find(user => user.id == activeUser.id);
      if(!isUserInList && tmpUserList) {
        const [firstUser] = tmpUserList;
        selectUser(firstUser.id);
      }
    } else {
      tmpUserList = users;
    }
    
    
    if(sortOrder && sortParam && tmpUserList) {
      tmpUserList = sortUsers(tmpUserList, sortParam, sortOrder);
    }
    
    setUserList([...tmpUserList]);
    setIsLoaded(true);
  }, [users, sortParam, sortOrder, filter, activeUser]);
  
  if(!isLoaded) {
    return <Loading />;
  } else {
    if(userList) {
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
    } else {
      return (
      <div className="col-8 list-group rounded-0">
        <h3 className="list-group-item list-group-item-action rounded-0">No users found by this request</h3>
      </div>
    )
  }
  }
}