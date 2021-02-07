import React, { Component } from 'react';
import UserData from './UserData';


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.userList = props.users.map((user) => 
          <UserData 
            key={user.id.toString()} 
            id={user.id}
            name={user.name}
            age={user.age}
            phone={user.phone}
            image={user.image}
          />
        );
    }

    render() {
        return (
          <div className="col-9">
            {this.userList}
          </div>
        )
    }
}