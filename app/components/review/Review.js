'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import ReviewFilter from './ReviewFilter';
import ReviewContent from './ReviewContent';

var ParseComponent = ParseReact.Component(React);

var Province = Parse.Object.extend("Province");

const styles = {
    info: {
        paddingTop: "25px",
        paddingBottom: "10px"
    }
}

class Review extends ParseComponent {

    constructor(props) {
        super(props);
        this.state = {
            "sortDir": "ascending",
            "sortBy": "createdAt"
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

        return {
            provinces: new Parse.Query('Province').select(["objectId", "name"]),
            cities: new Parse.Query('City').equalTo("province", province).select(["objectId", "name"]),
            services: new Parse.Query('Service').select(["objectId", "name"]),
            reviews: reviewQuery.limit(6)
        };
    }


    render() {
        return (
            <section style={styles.info}>
                <div className="row">
                    <ReviewFilter provinces={this.data.provinces} cities={this.data.cities}
                                  services={this.data.services}
                                  submit={this._createItem.bind(this)}/></div>

                <div className="row">
                    <ReviewContent reviews={this.data.reviews}/></div>
            </section>
        );
    }

    _createItem(filterState) {
        this.setState(filterState);
    }

}
export default Review
