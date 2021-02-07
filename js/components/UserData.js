import React, { Component } from 'react';
import Avatar from './Avatar';

export default class UserData extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
      return (
          <div className="row">
              <div className="col"><Avatar image={this.props.image} /></div>
              <div className="col">{this.props.name}</div>
              <div className="col">{this.props.age}</div>
              <div className="col">{this.props.phone}</div>
          </div>
      )
  }
}
