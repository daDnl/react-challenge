import React from 'react';
import { UserData } from './UserData';
import { useDispatch } from 'react-redux';
import {
  activeUserChange
} from './usersSlice';

export const UserList = (props) => {
  const dispatch = useDispatch();
  const userList = props.userList;

  const activeUser = props.activeUser ? props.activeUser : null;
  
  if (userList.length) {
    return (
      <div className="col-8 list-group rounded-0">
        {props.userList.map((user) =>
          <UserData
            key={user.id.toString()}
            id={user.id}
            name={user.name}
            age={user.age}
            phone={user.phone}
            image={user.image}
            selected={activeUser ? user.id === activeUser.id : false}
          />
        )}
      </div>
    )
  } else {
    //dispatch(activeUserChange(null));
    return (
      <div className="col-8 list-group rounded-0">
        <h3 className="list-group-item list-group-item-action rounded-0">No users found by this request</h3>
      </div>
    )
  }
}