'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'
import Colors from '../../constants/JendelaColors'
import Rating from '../template/Rating'

var moment = require('moment');
moment.locale("id-ID");

import { Component } from 'react';

const styles = {
    postPanel: {
        marginTop: '1em',
        marginBottom: '3em',
    },
    postTime: {
        fontSize: '0.8em',
        fontWeight: '900',
        color:'#b9b9b9',
        textTransform: "uppercase",
        letterSpacing: "1px"
    },
    postTitle: {
        fontSize: '1.5em',
        fontWeight: 900,
        marginBottom: "-5px",
        color: Colors.blue
    },
    postPlaceType: {
        color: Colors.green,
        fontWeight: 900,
        fontSize: "1em"
    },
    postContent: {
        marginTop: "1em",
        fontSize: "16px",
        color: "#6d6d6d"
    },
    postDetails: {
        marginTop: "1em",
        color: "#798eaf",
        fontWeight: 900,
        fontSize: "0.9em"
    }
}

class ReviewContent extends Component {

    constructor(props) {
        super(props);
    }

    _renderDetails(imagePath, content) {
        return (
            <span style={{ marginRight: "2em" }}>
                <img src={imagePath} style={{ marginRight: "8px" }} />
                <span>{content}</span>
            </span>
        )
    }

    render() {

        if (this.props.reviews.length == 0)
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <p>Tidak ada review berdasarkan filter</p>
                    </div>
                </div>
            );

        return (
            <div className="row">
                {this.props.reviews.map((review)=> {
                    const strippedCity = review.city.name.replace('Kabupaten ', '')
                    const strippedProvince = review.city.province.name.replace('Provinsi ', '')
                    const info = `${strippedCity}, ${strippedProvince} | ${review.service.name}`
                    const content = (review.content !== '') ? review.content : (<em>-- tidak ada komentar --</em>)

                    const date = this._renderDetails("img/review-calendar.png", "12 Desember 2015")
                    const fee = this._renderDetails("img/review-moneybag.png", (review.fee > 0 ? `Rp ${review.fee}` : "GRATIS"))
                    const duration = this._renderDetails("img/review-duration.png", `${review.duration} HARI`)

                    return (
                        <div style={styles.postPanel} className="small-12 medium-6 large-6 columns" key={review.objectId}>
                            <div style={styles.postTime}>Diulas {moment(review.createdAt).fromNow()}</div>
                            <div style={styles.postTitle}>{review.title}</div>

                            <Rating rating={review.rating} />

                            <div style={styles.postPlaceType}>{info}</div>

                            <div style={styles.postContent}>
                                { content }
                                <div style={styles.postDetails}>
                                    <span>{ date }</span>
                                    <br className="hide-for-medium" />
                                    <span>{ fee }</span>
                                    <br className="hide-for-medium" />
                                    <span>{ duration }</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

}
ReviewContent.defaultProps = {reviews: []};
export default ReviewContent
