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
                <div className="small-12 columns">
                    <p>Tidak ada kota yang dipilih</p>
                </div>
            );

        let city = this.props.city[0];

        return (
            <section>
                <div className="large-12 columns">
                    <div className="row">
                        <div className="small-6 columns">
                            <h3>{city.name}</h3>
                            <h5>Nama si abang</h5>
                            <h5>Alamat si abang</h5>
                        </div>
                        <div className="small-4 columns">
                            <button type="button" className="button" style={{background:'#31A694'}}>Tulis Ulasan</button>
                            <button type="button" className="button" style={{background:'#31A694'}}>Share</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="large-4 columns">
                            <div>Ulasan</div>
                            <div>Total Biaya</div>
                        </div>
                        <div className="small-8 columns">
                            <div className="row">
                                <div className="large-6 columns">
                                    <div>Some Stats</div>
                                </div>
                                <div className="large-6 columns">
                                    <div>Some Stats</div>
                                </div>
                                <div className="large-6 columns">
                                    <div>Some Stats</div>
                                </div>
                                <div className="large-6 columns">
                                    <div>Some Stats</div>
                                </div>
                                <div className="large-6 columns">
                                    <div>Some Stats</div>
                                </div>
                                <div className="large-6 columns">
                                    <div>Some Stats</div>
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
