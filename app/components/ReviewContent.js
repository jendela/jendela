'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import { Component } from 'react';

class ReviewContent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.reviews.length == 0)
            return <span>No content</span>;

        return (
            <div>
                {this.props.reviews.map((e)=> {
                    return <div key={e.objectId}>{e.title}</div>
                })}
            </div>
        );
    }

}
ReviewContent.defaultProps = {reviews: []};
export default ReviewContent
