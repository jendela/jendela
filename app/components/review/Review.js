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
        paddingTop: "25px",
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
            "pageNum": 0
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
        let reviewQuery = new Parse.Query('Review');
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
        reviewQuery.descending(this.state.sortBy);
        if (props.reviewType == "lite")
            reviewQuery.limit(6);
        else
            reviewQuery.limit(MAX_SHOWN_POST);

        return {
            provinces: new Parse.Query('Province').select(["objectId", "name"]),
            cities: new Parse.Query('City').equalTo("province", province).select(["objectId", "name"]),
            services: new Parse.Query('Service').select(["objectId", "name"]),
            reviews: reviewQuery.skip(states.pageNum * 10),
            city: new Parse.Query('City').equalTo("objectId", states.city)
        };
    }


    render() {

        if (this.props.reviewType == "lite")
            return this.renderLite();
        else
            return this.renderFull();

        /*

         let cityInfo = null;
         if (this.props.reviewType != "lite")
         cityInfo = <div className="row"><ReviewCity city={this.data.city}/></div>;

         return (
         <section style={styles.info}>
         <div className="row">
         <ReviewFilter reviewType="location"
         provinces={this.data.provinces}
         cities={this.data.cities}
         services={this.data.services}
         submit={this._createItem.bind(this)} />
         </div>

         {cityInfo}

         <div className="row">
         <div className="small-12 columns">
         <h3>Ulasan Terakhir</h3>
         </div>
         </div>

         <ReviewFilter reviewType={this.props.reviewType == "lite" ? "full" : "others"}
         provinces={this.data.provinces}
         cities={this.data.cities}
         services={this.data.services}
         submit={this._createItem.bind(this)}/>

         {this.props.reviewType != "lite" ? <div className="row">
         <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
         updatePage={this._updatePage.bind(this)}/></div> : <span></span>}
         <div className="row">
         <ReviewContent reviews={this.data.reviews}/></div>
         {this.props.reviewType != "lite" ? <div className="row">
         <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
         updatePage={this._updatePage.bind(this)}/></div> : <span></span>}
         </section>
         );*/
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
                <div className="row">
                    <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
                                updatePage={this._updatePage.bind(this)}/>
                </div>
                {renderContents.call(this)}
                <div className="row">
                    <ReviewPage page={this.state.pageNum} showNext={this.data.reviews.length==MAX_SHOWN_POST}
                                updatePage={this._updatePage.bind(this)}/>
                </div>
            </div>
        );

        return (
            <div>
                {renderFilter.call(this, "location")}
                {this.state.city ? contents : <span></span>}
            </div>
        );
    }

    _updatePage(newPageNum) {
        this.setState({"pageNum": newPageNum});
    }

    _createItem(filterState) {
        this.setState(filterState);
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

    return (
        <div className="row">
            {review}
        </div>
    );
}

function renderCity() {
    return <ReviewCity city={this.data.city}/>;
}

function renderContents() {
    return (
        <div className="row">
            <ReviewContent reviews={this.data.reviews}/>
        </div>
    );
}

Review.defaultProps = {reviewType: undefined};
export default Review
