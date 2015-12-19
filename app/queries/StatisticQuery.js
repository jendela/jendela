'use strict';

import Parse from 'parse';

const Query = {
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
  getProvinceServiceDetailsByLocale(provinceLocale) {
    let provQuery = new Parse.Query('Province')
      .equalTo('locale', provinceLocale);
    let provSvcQuery = new Parse.Query('ProvinceServiceDetail')
      .matchesQuery('province', provQuery)
      .equalTo('month', undefined)
      .equalTo('year', undefined)
      .include('service');
    return provSvcQuery;
  },
  getProvinceServiceDetails(provinceId) {
    let provQuery = new Parse.Query('Province')
      .equalTo('objectId', provinceId);
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
};

export default Query;
