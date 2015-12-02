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

        let prev = <span></span>;
        if (this.props.page != 0)
            prev = <button style={{background:'#31A694'}} onClick={this._onPrevClicked.bind(this)}>Sebelumnya</button>;
        let next = <span></span>;
        if (this.props.showNext)
            next = <button style={{background:'#31A694'}} onClick={this._onNextClicked.bind(this)}>Selanjutnya</button>

        return (
            <div className="row">
                <div className="small-4 small-centered columns">
                    {prev}
                    <span> Halaman {this.props.page + 1} </span>
                    {next}
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
