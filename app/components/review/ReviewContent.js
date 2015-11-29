'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'

var moment = require('moment');
moment.locale("id-ID");

import { Component } from 'react';

const styles = {
    dark: {
        background: "#010E25",
        color: "#9DBBD0"
    },
    logo: {
        height: '3.2em'
    },
    link: {
        color: "#9DBBD0",
        textTransform: "uppercase",
        fontSize: '0.8em',
        fontWeight: 900,
        letterSpacing: '1px'
    },
    noPadding: {
        padding: 0
    },

    post_panel: {
        marginBottom: '1em',
    },
    post_rating: {},
    post_time: {
        fontSize: '0.8em',
        textTransform: "uppercase",
    },
    post_title: {
        fontSize: '1.5em',
        fontWeight: 900,
    },
    post_content: {},
    post_detail: {}
}
class ReviewContent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.reviews.length == 0)
            return (
                <div className="small-12 columns">
                    <p>Tidak ada review berdasarkan filter</p>
                </div>
            );

        return (
            <div>
                {this.props.reviews.map((e)=> {
                    console.log(e);
                    return (
                        <div style={styles.post_panel} className="small-12 large-6 columns" key={e.objectId}>
                            <div style={styles.post_time}>Diulas {moment(e.createdAt).fromNow()}</div>
                            <div style={styles.post_title}>{e.title}</div>
                            <div style={styles.post_rating}>{e.rating} bintang</div>
                            <p style={styles.post_content}>
                                {e.content}
                                <div>
                                    <span style={styles.post_detail}></span>
                                    <span style={styles.post_detail}>Rp {e.fee},00</span>
                                </div>
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    }

}
ReviewContent.defaultProps = {reviews: []};
export default ReviewContent
