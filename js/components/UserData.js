import React, { useEffect, useState } from 'react';
import { Avatar } from './Avatar';


export const UserData = (props) => {
    const { id, image, name, age, phone, onUserClick, selected } = props;

    const [isSelected, setIsSelected] = useState(selected);

    const handleClick = () => {
      setIsSelected(true);
      onUserClick(id);
    }
    
    //console.log(id);
    return (
        <div className={isSelected ? 'row selected-row' : 'row'} onClick={handleClick}>
            <div className="col"><Avatar image={image} /></div>
            <div className="col">{name}</div>
            <div className="col">{age}</div>
            <div className="col">{phone}</div>
        </div>
    )
}

