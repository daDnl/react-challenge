import React, { Component } from 'react';

export default class Avatar extends Component {
    constructor(props) {
        super(props);
        this.imgSrc = `images/${props.image}.svg`;
    }

    render() {
        return (
            <img className="img-fluid" src={this.imgSrc} />
        )
    }
}