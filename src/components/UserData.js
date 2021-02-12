import React from 'react';
import { Avatar } from './Avatar';


export const UserData = (props) => {
    const { id, image, name, age, phone, onUserClick, selected } = props;
    const className = 'list-group-item list-group-item-action rounded-0';
    
    const handleClick = () => {
      onUserClick(id);
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

