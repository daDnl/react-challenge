import React from 'react';
import { Avatar } from './Avatar';


export const ActiveUser = (props) => {
  const { id, image, name, age, phone, phrase } = props.user;
  
  return (
    <div className="col-4">
      <div className="row justify-content-between">
        <Avatar image={image} />
      </div>
      <div className="row justify-content-between">
        <p>Name</p> <p>{name}</p>
      </div>
      <div className="row justify-content-between">
        <p>Age</p> <p>{age}</p>
      </div>
      <div className="row justify-content-between">
        <p>Phone</p> <p>{phone}</p>
      </div>
      <div className="row justify-content-between">
        <p>Animal</p> <p>{image}</p>
      </div>
      <div className="row">
        <p><b>Коронная фраза:</b> {phrase}</p>
      </div>
    </div>
  )
}