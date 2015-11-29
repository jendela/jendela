'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import { Component } from 'react';

class ReviewFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "province": "",
            "city": "",
            "category": "Total Biaya",
            "service": "",
            "sortBy": "Terurut Mengecil"
        }
    }

    render() {

        // filter level
        let province = (
            <div className="large-2 columns">
                <label htmlFor="province">Provinsi</label>
                <select id="province" onChange={this._onChangeProvince.bind(this)}>
                    {<option key={undefined}
                             value="">Semua Provinsi</option>}
                    {this.props.provinces.map((province) => {
                        return <option key={province.objectId}
                                       value={province.objectId}>{province.name}</option>
                    })}
                </select>
            </div>
        );

        // filter location
        let city = (
            <div className="large-2 columns">
                <label htmlFor="city">City</label>
                <select id="city" onChange={this._onChangeCity.bind(this)}>
                    {<option key={undefined}
                             value="">Semua Kota</option>}
                    {this.props.cities.map((city) => {
                        return <option key={city.objectId}
                                       value={city.objectId}>{city.name}</option>
                    })}
                </select>
            </div>
        );

        // filter service
        let service = (
            <div className="large-2 columns">
                <label htmlFor="service">Service</label>
                <select id="service" onChange={this._onChangeService.bind(this)}>
                    {<option key={undefined}
                             value={undefined}>Semua Layanan</option>}
                    {this.props.services.map((service) => {
                        return <option key={service.objectId}
                                       value={service.objectId}>{service.name}</option>
                    })}
                </select>
            </div>
        );

        // filter category
        let category = (
            <div className="large-2 columns">
                <label htmlFor="category">Category</label>
                <select id="category" onChange={this._onChangeCategory.bind(this)}>
                    {this.props.categories.map((category) => {
                        return <option key={category}
                                       value={category}>{category}</option>
                    })}
                </select>
            </div>
        );

        // sort
        let sortBy = (
            <div className="large-2 columns">
                <label htmlFor="sortBy">Urut Berdasarkan</label>
                <select id="sortBy" onChange={this._onChangeSortBy.bind(this)}>
                    {this.props.sortBys.map((sortBy) => {
                        return <option key={sortBy}
                                       value={sortBy}>{sortBy}</option>
                    })}
                </select>
            </div>
        );

        return (
            <div>
                {province}
                {city}
                {category}
                {service}
                {sortBy}
            </div>
        );
    }

    _onChangeProvince(e) {
        console.log(e.target);
        this.setState({"province": e.target.value});
        this._submit("province", e.target.value);
    }

    _onChangeCity(e) {
        this.setState({"city": e.target.value});
        this._submit("city", e.target.value);
    }

    _onChangeCategory(e) {
        this.setState({"category": e.target.value});
        this._submit("category", e.target.value);
    }

    _onChangeService(e) {
        this.setState({"service": e.target.value});
        this._submit("service", e.target.value);
    }

    _onChangeSortBy(e) {
        this.setState({"sortBy": e.target.value});
        this._submit("sortBy", e.target.value);
    }

    _submit(key, value) {
        var toSubmit = {
            "province": this.state.province,
            "city": this.state.city,
            "category": this.state.category,
            "service": this.state.service,
            "sortBy": this.state.sortBy
        };
        toSubmit[key] = value;
        this.props.submit(toSubmit);
    }

}
ReviewFilter.defaultProps = {
    provinces: [],
    cities: [],
    categories: ["Total Biaya", "Rata-rata Biaya"],
    services: [],
    sortBys: ["Terurut Mengecil"],
};
export default ReviewFilter
