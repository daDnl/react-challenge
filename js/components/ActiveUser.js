import React from 'react';
import { Avatar } from './Avatar';


export const ActiveUser = (props) => {
  const { id, image, name, age, phone, phrase } = props.user;
  
  return (
    <div className="card col-4 align-self-start h-auto1 p-4">
      <Avatar className="img-fluid card-img-top" image={image} />
        <div className="card-body">
          <div className="card-title row justify-content-between"><p>Name</p> <p>{name}</p></div>
          <div className="card-title row justify-content-between"><p>Age</p> <p>{age}</p></div>
          <div className="card-title row justify-content-between"><p>Phone</p> <p>{phone}</p></div>
          <div className="card-title row justify-content-between"><p>Animal</p> <p>{image}</p></div>
          <p className="card-text row"><b>Коронная фраза:</b> {phrase}</p>
        </div>
    </div>
  )
}