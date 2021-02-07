import React, { Component } from 'react';


export default class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value }); 
    }

    render() {
      return (
        <div className="row">
            <input type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
      )
    }
}