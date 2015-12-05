'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import { Component } from 'react';

class ReviewPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let prev = <li className="pagination-previous disabled">Sebelum</li>;
        if (this.props.page != 0)
            prev = <li className="pagination-previous"><a href="#" onClick={this._onPrevClicked.bind(this)}>Sebelum</a></li>;
        let next = <li className="pagination-next disabled">Setelah</li>;
        if (this.props.showNext)
            next = <li className="pagination-next"><a href="#" onClick={this._onNextClicked.bind(this)}>Setelah</a></li>;

        return (
            <div className="row">
                <div className="small-12 columns">
                    <ul className="pagination text-center">
                        {prev}
                        <li className="current"><span className="show-for-sr">Anda di halaman</span> {this.props.page + 1} </li>
                        {next}
                    </ul>
                </div>
            </div>

        );
    }

    _onPrevClicked(e) {
        this.props.updatePage(this.props.page - 1);
    }

    _onNextClicked(e) {
        this.props.updatePage(this.props.page + 1);
    }

}
ReviewPage.defaultProps = {
    page: 0,
    showNext: false
};
export default ReviewPage
