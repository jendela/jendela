'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

var moment = require('moment');
moment.locale("id-ID");

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
                    console.log(e);
                    return (
                        <div className="small-12 large-6 columns" key={e.objectId}>
                            <h7>Diulas {moment(e.createdAt).fromNow()}</h7>
                            <h5>{e.title}</h5>
                            <h6>{e.rating} bintang</h6>
                            <p>{e.content}</p>
                            <div><span></span><span>{e.fee}</span></div>
                        </div>
                    );
                })}
            </div>
        );
    }

}
ReviewContent.defaultProps = {reviews: []};
export default ReviewContent
