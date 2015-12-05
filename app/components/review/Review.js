import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import ReviewFilter from './ReviewFilter';
import ReviewContent from './ReviewContent';
import ReviewCity from './ReviewCity';
import ReviewPagination from './ReviewPagination';

import Title from '../template/Title'
import CommonQuery from '../../queries/CommonQuery';
import StatisticQuery from '../../queries/StatisticQuery';


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
            "sortDir": "ascending",
            "sortBy": "createdAt",
            "pageNum": 0,
            "sortBasedOn": "Waktu"
        }
    }

    observe(props, states) {
        return {
            provinces: CommonQuery.getProvinceNames(),
            cities: CommonQuery.getCitiesByProvince(states.province),
            services: CommonQuery.getServiceNames(),
            reviews: CommonQuery.getReview(states.province, states.city, states.service, states.pageNum, states.sortBasedOn, props.reviewType),
            city: CommonQuery.getCityById(states.city),
            details: StatisticQuery.getCityServiceDetails(states.city)
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

        this.setState(newState)
    }

    renderFilter() {
        const { provinces, cities, services } = this.data
        return (
            <ReviewFilter
                reviewType={ "compact" }
                provinces={ provinces }
                cities={ cities }
                services={ services }
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
            </div>
        );
    }

    renderFull() {
        const { city, details, reviews } = this.data
        const { pageNum } = this.state

        const isCityExist = (city !== null)
        const cityPanel = <ReviewCity city={ city } details={ details } />
        const content = ( isCityExist ? <ReviewContent reviews={ reviews } /> : <em>Pilih provinsi atau kota...</em>)
        const pagination = ( !isCityExist ? null :
            <ReviewPagination
                page={ pageNum }
                showNext={ (reviews.length == MAX_SHOWN_POST) }
                updatePage={ this._updatePage.bind(this) } />
        )

        return (
            <div>
                <section style={styles.container}>
                    <Title
                        text="Lihat Ulasan"
                        iconPath="img/icon-title-last-reviews.png"
                        color="#2d4771" />
                    { this.renderFilter() }
                    { cityPanel }
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
