'use strict'

import Parse from 'parse'

const MAX_SHOWN_POST = 6;

const Query = {
    getNation(){
        return new Parse.Query('Nation');
    },
    getProvinceByLocale(provinceLocale) {
        return new Parse.Query('Province')
            .equalTo('locale', provinceLocale);
    },
    getProvince() {
        return new Parse.Query('Province');
    },
    getCityById(cityId) {
        return new Parse.Query('City')
            .equalTo('objectId', cityId);
    },
    getProvinceNames() {
        return new Parse.Query('Province')
            .ascending('name')
            .select('locale')
            .select('name');
    },
    getServiceNames() {
        return new Parse.Query('Service')
            .ascending('name')
            .select('iconPath')
            .select('name');
    },
    getCityNamesByProvince(province) {
        return new Parse.Query('City')
            .equalTo("province", province)
            .select(["objectId", "name"])
            .ascending('name');
    },
    getCitiesByProvince(province) {
        return new Parse.Query('City')
            .ascending("name")
            .equalTo("province", province ? {
                "__type": "Pointer",
                "className": "Province",
                "objectId": province
            } : undefined)
            .select(["objectId", "name"])
    },
    getReview(statesProvince, statesCity, statesService, statesPageNum, statesSortBasedOn, reviewType) {

        // selected province
        let province = statesProvince ? {
            "__type": "Pointer",
            "className": "Province",
            "objectId": statesProvince
        } : undefined;

        // selected city
        let city = statesCity ? {
            "__type": "Pointer",
            "className": "City",
            "objectId": statesCity
        } : undefined;

        // selected service
        let service = statesService ? {
            "__type": "Pointer",
            "className": "Service",
            "objectId": statesService
        } : undefined;

        // review
        let reviewQuery = new Parse.Query('Review')
            .include("service")
            .include("city.province")
            .skip(statesPageNum * 10);
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
        if (statesSortBasedOn == "Waktu") {
            reviewQuery.descending("createdAt");
        } else if (statesSortBasedOn == "Biaya") {
            reviewQuery.descending("fee");
        } else if (statesSortBasedOn == "Bintang") {
            reviewQuery.descending("rating");
        }
        if (reviewType == "lite")
            reviewQuery.limit(6);
        else
            reviewQuery.limit(MAX_SHOWN_POST);

        return reviewQuery;
    }
}

export default Query
