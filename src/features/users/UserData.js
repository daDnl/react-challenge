import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from './Avatar';
import {
  activeUserChange
} from './usersSlice';

export const UserData = (props) => {
    const { id, image, name, age, phone, selected } = props;
    const className = 'list-group-item list-group-item-action rounded-0';
    
    const dispatch = useDispatch();
    
    const handleClick = () => {
      dispatch(activeUserChange(id));
    }
    
    return (
        <button className={selected ? className + ' active' : className}>
          <div className="row align-items-center" onClick={handleClick}>
            <div className="col"><Avatar className="img-fluid w-50" image={image} /></div>
            <div className="col">{name}</div>
            <div className="col">{age}</div>
            <div className="col">{phone}</div>
          </div>
        </button>
    )
}

