'use strict'

import Parse from 'parse'

var Query = {
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
    },
    getProvince(provinceLocale) {
        return new Parse.Query('Province')
            .equalTo('locale', provinceLocale);
    },
    getProvinceNames() {
        return new Parse.Query('Province')
            .ascending('name')
            .select('locale')
            .select('name');
    }
}

module.exports = Query
