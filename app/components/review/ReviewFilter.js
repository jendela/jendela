'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

import StringConstants from '../../constants/StringConstants'

import { Component } from 'react';

const styles = {
    content: {
        paddingTop: "15px",
    }
}

class ReviewFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "sortBasedOn": StringConstants.TIME
        }
    }

    render() {
        let reviewType = this.props.reviewType;
        let filters = [];

        if (reviewType == "location" || reviewType == "compact") {
            filters.push(generateComboObj(StringConstants.PROVINCE, this.props.provinces, this._onChangeProvince.bind(this)))
            filters.push(generateComboObj(StringConstants.CITY, this.props.cities, this._onChangeCity.bind(this)));
        }

        if (reviewType == "others" || reviewType == "compact") {
            filters.push(generateComboObj(StringConstants.SERVICE, this.props.services, this._onChangeService.bind(this)))
            filters.push(generateComboStr(StringConstants.SORT_BASED_ON, this.props.sortBasedOn, this._onChangeSortBasedOn.bind(this)));
        }

        return (
            <div style={styles.content} className="row">
                {filters}
            </div>
        );
    }

    _onChangeProvince(e) {
        this.setState({"province": e.target.value});
        this._submit("province", e.target.value);
    }

    _onChangeCity(e) {
        this.setState({"city": e.target.value});
        this._submit("city", e.target.value);
    }

    _onChangeService(e) {
        this.setState({"service": e.target.value});
        this._submit("service", e.target.value);
    }

    _onChangeSortBasedOn(e) {
        this.setState({"sortBasedOn": e.target.value});
        this._submit("sortBasedOn", e.target.value);
    }

    _submit(key, value) {
        var toSubmit = {
            "province": this.state.province,
            "city": this.state.city,
            "service": this.state.service,
            "sortBy": this.state.sortBy,
            "sortBasedOn": this.state.sortBasedOn,
        };
        toSubmit[key] = value;
        this.props.submit(toSubmit);
    }

}

function generateComboObj(type, list, onchange) {
    return (
        <div className="small-12 large-3 columns" key={type}>
            <select id="province" onChange={onchange}>
                <option key="all" value="all">{StringConstants.ALL} {type}</option>
                {list.map((e) => {
                    return <option key={e.objectId} value={e.objectId}>{e.name}</option>;
                })}
            </select>
        </div>
    );
}

function generateComboStr(type, list, onchange) {
    return (
        <div className="large-2 columns" key={type}>
            <select id="province" onChange={onchange}>
                {list.map((e) => {
                    return <option key={e} value={e}>{e}</option>;
                })}
            </select>
        </div>
    );
}

ReviewFilter.defaultProps = {
    provinces: [],
    cities: [],
    categories: ["Total Biaya", "Rata-rata Biaya"],
    services: [],
    sortBasedOn: ["Waktu", "Biaya", "Bintang"],
    sortBys: ["Terurut Mengecil"],
};
export default ReviewFilter
