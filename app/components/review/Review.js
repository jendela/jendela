'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import ReviewFilter from './ReviewFilter';
import ReviewContent from './ReviewContent';
import ReviewCity from './ReviewCity';
import ReviewPage from './ReviewPage';

var ParseComponent = ParseReact.Component(React);

var Province = Parse.Object.extend("Province");

const styles = {
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

        // selected province
        let province = undefined;
        if (states.province)
            province = {
                "__type": "Pointer",
                "className": "Province",
                "objectId": states.province
            };

        // selected city
        let city = undefined;
        if (states.city)
            city = {
                "__type": "Pointer",
                "className": "City",
                "objectId": states.city
            };

        // selected service
        let service = undefined;
        if (states.service)
            service = {
                "__type": "Pointer",
                "className": "Service",
                "objectId": states.service
            };

        // review query
        let reviewQuery = new Parse.Query('Review').include("service").include("city.province");
        if (city != undefined)
            reviewQuery.equalTo("city", city);
        else if (province != undefined) {
            let cityQuery = new Parse.Query('City');
            cityQuery.equalTo("province", province);
            reviewQuery.matchesQuery("city", cityQuery);
        }
        if (service != undefined) {
            reviewQuery.equalTo("service", service);
        }
        if (states.sortBasedOn == "Waktu") {
            reviewQuery.descending("createdAt");
        } else if (states.sortBasedOn == "Biaya") {
            reviewQuery.descending("fee");
        } else if (states.sortBasedOn == "Bintang") {
            reviewQuery.descending("rating");
        }
        if (props.reviewType == "lite")
            reviewQuery.limit(6);
        else
            reviewQuery.limit(MAX_SHOWN_POST);

        let cityServiceDetail = new Parse.Query('CityServiceDetail');
        cityServiceDetail.equalTo("city", city);
        cityServiceDetail.equalTo("year", undefined);
        cityServiceDetail.equalTo("month", undefined);
        cityServiceDetail.include("service");

        return {
            provinces: new Parse.Query('Province').ascending("name").select(["objectId", "name"]),
            cities: new Parse.Query('City').ascending("name").equalTo("province", province).select(["objectId", "name"]),
            services: new Parse.Query('Service').ascending("name").select(["objectId", "name"]),
            reviews: reviewQuery.skip(states.pageNum * 10),
            city: new Parse.Query('City').equalTo("objectId", states.city),
            details: cityServiceDetail
        };
    }


    render() {

        console.log(this.state)

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
            <div>
                {renderTitle.call(this)}
                {renderFilter.call(this, "compact")}
                {renderContents.call(this)}
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
                {renderCity.call(this)}
                {renderTitle.call(this)}
                {renderFilter.call(this, "others")}
                <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
                            updatePage={this._updatePage.bind(this)}/>
                {renderContents.call(this)}
                <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
                            updatePage={this._updatePage.bind(this)}/>
            </div>
        );

        return (
            <div>
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

function renderTitle() {
    return (
        <div className="row">
            <div className="small-12 columns">
                <h3>Ulasan Terakhir</h3>
            </div>
        </div>
    );
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

function renderCity() {
    return <ReviewCity city={this.data.city} details={this.data.details}/>;
}

function renderContents() {
    return <ReviewContent reviews={this.data.reviews}/>;
}

Review.defaultProps = {reviewType: undefined};
export default Review
