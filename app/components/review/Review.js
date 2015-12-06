import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import { Link } from 'react-router'

import ReviewFilter from './ReviewFilter';
import ReviewContent from './ReviewContent';
import ReviewLocation from './ReviewLocation';
import ReviewPagination from './ReviewPagination';

import Title from '../template/Title'
import CommonQuery from '../../queries/CommonQuery';
import StatisticQuery from '../../queries/StatisticQuery';
import StringConstants from '../../constants/StringConstants';


var ParseComponent = ParseReact.Component(React);

var Province = Parse.Object.extend("Province");

const styles = {
    container: {
        background: "#f2faff",
        paddingTop: "25px",
        paddingBottom: "1px"
    },
    title: {
        fontSize: "2em",
        fontWeight: "bold"
    },
    content: {
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    entry: {
        paddingBottom: "10px"
    }
}


const MAX_SHOWN_POST = 10;

class Review extends ParseComponent {

    constructor(props) {
        super(props);
        this.state = {
            province: props.params && props.params.provinceId ? props.params.provinceId : "",
            "sortDir": "ascending",
            "sortBy": "createdAt",
            "pageNum": 0,
            "sortBasedOn": StringConstants.TIME
        }
    }

    observe(props, states) {
        return {
            provinces: CommonQuery.getProvinceNames(),
            cities: CommonQuery.getCitiesByProvince(states.province),
            services: CommonQuery.getServiceNames(),
            reviews: CommonQuery.getReview(states.province, states.city, states.service, states.pageNum, states.sortBasedOn, props.reviewType)
        }
    }

    _updatePage(newPageNum) {
        this.setState({"pageNum": newPageNum});
    }

    _createItem(filterState) {
        var newState = {}

        for (var prop in filterState) {
            if (filterState[prop]) {
                if (filterState[prop] == "all") {
                    newState[prop] = undefined
                } else {
                    newState[prop] = filterState[prop]
                }
            }
        }

        // checking for prop and city
        if (!newState.province)
            newState.city = "";

        this.setState(newState)
    }

    renderFilter() {
        const { province } = this.state
        const { provinces, cities, services } = this.data
        return (
            <ReviewFilter
                reviewType={ "compact" }
                provinces={ provinces }
                cities={ cities }
                services={ services }
                province={ province }
                submit={ this._createItem.bind(this) } />
        )
    }

    renderLite() {
        return (
            <div style={styles.container}>
                <Title
                    text="Ulasan Terakhir"
                    iconPath="img/icon-title-last-reviews.png"
                    color="#2d4771" />

                { this.renderFilter() }

                <ReviewContent reviews={this.data.reviews}/>

                <div className="row" style={{ marginBottom: "1em" }}>
                    <div className="small-12 medium-4 columns">
                        <Link to="/review" className="button expanded success">
                            <img src="/img/icon-eye.png" style={{ marginRight: '1em', paddingTop:"5px", paddingBottom:"5px" }} />
                            <strong>Lihat ulasan lengkap</strong>
                        </Link>
                    </div>
                    <div className="small-12 medium-4 columns">
                        <Link to="/addreview" className="button expanded success">
                            <img src="/img/icon-pen.png" style={{ marginRight: '1em' }} />
                            <strong>Saya mau memberi ulasan!</strong>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    renderFull() {
        const { reviews } = this.data
        const { pageNum, province } = this.state

        const locationPanel = <ReviewLocation provinceId={province} />
        const content = ( <ReviewContent reviews={ reviews } /> )
        const pagination = reviews.length ? (
            <ReviewPagination
                page={ pageNum }
                showNext={ (reviews.length == MAX_SHOWN_POST) }
                updatePage={ this._updatePage.bind(this) } />
        ) : undefined

        return (
            <div>
                <section style={styles.container}>
                    <Title
                        text="Lihat Ulasan"
                        iconPath="img/icon-title-last-reviews.png"
                        color="#2d4771" />
                    { this.renderFilter() }
                    { locationPanel }
                </section>

                { content }
                { pagination }
            </div>
        );
    }

    render() {
        const { reviewType } = this.props
        return (reviewType === "lite") ? this.renderLite() : this.renderFull()
    }
}

Review.defaultProps = {reviewType: undefined};
export default Review
