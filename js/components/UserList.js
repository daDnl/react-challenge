import React, { useEffect, useState } from 'react';
import { UserData } from './UserData';


export const UserList = (props) => {
  const { users, sort, filter, selectUser, activeUser } = props;
  const [userList, setUserList] = useState(users);
  const [userComponents, setUserComponents] = useState([]);

  const filterUsers = (users, query) => {
    let nums = query.match(/\d+/g);
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

  /*const sortUsers = (users, sort) => {

  }*/
  
  const buildComponents = (users) => {
    return (
      users.map((user) =>
        <UserData
          key={user.id.toString()}
          id={user.id}
          name={user.name}
          age={user.age}
          phone={user.phone}
          image={user.image}
          onUserClick={handleUserClick}
          selected={user.id == activeUser.id ? true : false}
        />
      )
    );
  }

  const handleUserClick = (id) => {
    //setUserComponents(userComponents.find(userData => userData.id))
    selectUser(id);
  }

  useEffect(() => {
    if (filter) {
      setUserList(filterUsers(users, filter));
      if (!userList.find(user => user.id == activeUser.id)) {
        selectUser(userList[0].id);
      }
    } else {
      setUserComponents(buildComponents(userList));
    }
    
  }, [users, sort, filter]);
  
  if(!userList) {
    return <div>Загрузка...</div>;
  } else {

    return (
      <div className="col-8">
        {userComponents}
      </div>
    )
  }
}