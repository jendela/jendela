'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'

var moment = require('moment');
moment.locale("id-ID");

import { Component } from 'react';

class ReviewCity extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.city.length == 0)
            return (
                <section className="row">
                    <div className="small-12 columns">
                        <p>Tidak ada kota yang dipilih</p>
                    </div>
                </section>
            );

        let city = this.props.city[0];

        return (
            <section className="row">
                <div className="large-12 columns">
                    <div className="row">
                        <div className="small-6 columns">
                            <h3>{city.name}</h3>
                        </div>
                        <div className="small-4 columns">
                            <button type="button" className="button" style={{background:'#31A694'}}>Tulis Ulasan
                            </button>
                            <button type="button" className="button" style={{background:'#31A694'}}>Share</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="large-3 columns">
                            <div>Total Ulasan: {city.total_review ? city.total_review : 0}</div>
                            <div>Total Biaya: Rp. {city.total_fee ? city.total_fee : 0}</div>
                        </div>
                        <div className="small-9 columns">
                            <div className="row">
                                {this.props.details.length == 0 ?
                                    <p>Kota ini belum memiliki statistik, saatnya berkontribusi!</p>
                                    : undefined}
                                {this.props.details.map((e)=> {
                                    return <div className="large-3 columns">
                                        <div>Rata {e.service.name} Rp. {e.total_fee / e.total_review}</div>
                                    </div>;
                                })}
                                <div className="large-3 columns">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}
ReviewCity.defaultProps = {reviews: []};
export default ReviewCity
