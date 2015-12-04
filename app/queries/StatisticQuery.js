'use strict'

import Parse from 'parse'

var Query = {
    getCityServiceDetails(cityId) {
        let cityQuery = new Parse.Query('City')
            .equalTo('objectId', cityId);
        let citySvcQuery = new Parse.Query('CityServiceDetail')
            .matchesQuery('city', cityQuery)
            .equalTo('month', undefined)
            .equalTo('year', undefined)
            .include('service');
        return citySvcQuery;
    },
    getProvinceServiceDetails(provinceLocale) {
        let provQuery = new Parse.Query('Province')
            .equalTo('locale', provinceLocale);
        let provSvcQuery = new Parse.Query('ProvinceServiceDetail')
            .matchesQuery('province', provQuery)
            .equalTo('month', undefined)
            .equalTo('year', undefined)
            .include('service');
        return provSvcQuery;
    },
    getNationalServiceDetails() {
        let natSvcQuery = new Parse.Query('NationServiceDetail')
            .equalTo('month', undefined)
            .equalTo('year', undefined)
            .include('service');
        return natSvcQuery;
    }
}

module.exports = Query
