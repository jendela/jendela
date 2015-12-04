import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import ReviewFilter from './ReviewFilter';
import ReviewContent from './ReviewContent';
import ReviewCity from './ReviewCity';
import ReviewPage from './ReviewPage';

import Title from '../template/Title'
import CommonQuery from '../../queries/CommonQuery';
import StatisticQuery from '../../queries/StatisticQuery';


var ParseComponent = ParseReact.Component(React);

var Province = Parse.Object.extend("Province");

const styles = {
    container: {
    },
    info: {
        background: "#9DBBD0",
        paddingTop: "25px",
        paddingBottom: "25px"
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
        };
    }


    render() {
        if (this.props.reviewType == "lite")
            return this.renderLite();
        else
            return this.renderFull();

    }

    renderLite() {
        // render title
        // render compact filter
        // render contents
        return (
            <div style={styles.container}>
                <Title
                    text="Ulasan Terakhir"
                    iconPath="img/icon-title-last-reviews.png"
                    color="#2d4771" />

                {renderFilter.call(this, "compact")}
                <ReviewContent reviews={this.data.reviews}/>
            </div>
        );
    }

    renderFull() {
        // render location filter
        // render city
        // render title
        // render others filter
        // render pagination
        // render contents
        // render pagination

        let contents = (

            <div>

                <ReviewCity city={this.data.city} details={this.data.details}/>

                <Title
                    text="Ulasan Terakhir"
                    iconPath="img/icon-title-last-reviews.png"
                    color="#2d4771" />

                {renderFilter.call(this, "others")}
                <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
                            updatePage={this._updatePage.bind(this)}/>
                <ReviewContent reviews={this.data.reviews}/>
                <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
                            updatePage={this._updatePage.bind(this)}/>
            </div>
        );

        return (
            <div style={styles.container}>
                <section style={styles.info}>
                    <div className="row">
                        <div className="small-12 columns">
                            <div style={styles.title}>Lihat Ulasan</div>
                            <section>
                                <div className="row">
                                    <div className="large-12 columns">
                                        Simak ulasan-ulasan teman kamu di sini!
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                {renderFilter.call(this, "location")}
                {this.state.city ? contents : undefined}
            </div>
        );
    }

    _updatePage(newPageNum) {
        this.setState({"pageNum": newPageNum});
    }

    _createItem(filterState) {

        var newState = {};
        for (var prop in filterState) {
            if (filterState[prop]) {
                if (filterState[prop] == "all")
                    newState[prop] = undefined;
                else
                    newState[prop] = filterState[prop];
            }
        }

        this.setState(newState);
    }

}

function renderFilter(newReviewType) {
    let review = undefined;

    if (newReviewType == "location")
        review = <ReviewFilter reviewType={newReviewType}
                               provinces={this.data.provinces}
                               cities={this.data.cities}
                               submit={this._createItem.bind(this)}/>;
    else if (newReviewType == "others")
        review = <ReviewFilter reviewType={newReviewType}
                               services={this.data.services}
                               submit={this._createItem.bind(this)}/>
    else
        review = <ReviewFilter reviewType={newReviewType}
                               provinces={this.data.provinces}
                               cities={this.data.cities}
                               services={this.data.services}
                               submit={this._createItem.bind(this)}/>

    return review;
}

Review.defaultProps = {reviewType: undefined};
export default Review
