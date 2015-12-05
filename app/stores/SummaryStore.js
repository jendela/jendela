'use strict'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter} from 'events'
import assign from 'react/lib/Object.assign'
import MapConstants from '../constants/MapConstants'

import CommonQuery from '../queries/CommonQuery'
import StatisticQuery from '../queries/StatisticQuery'

const _info = {};

let _nationInfo = undefined;

let _category = "data.averageFee";

const _raw = [];

const CHANGE_EVENT = "change_event"

const SummaryStore = assign(EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getAllProvinces() {
        return _raw
    },

    getSummaryForProvinceId(provinceId) {
        if (!_summaries.hasOwnProperty(provinceId)) {
            return _summaries['IDN']
        }
        return _summaries[provinceId]
    },

    setSummary(provinceId, info) {
        _info[provinceId] = info;
        this.emitChange()
    },

    getSummary(provinceId) {
        if (!_info.hasOwnProperty(provinceId)) {
            return _nationInfo;
        }
        return _info[provinceId];
    },

    setCategory(category) {
        _category = category;
        this.emitChange()
    },

    getCategory() {
        return _category;
    },

    isSummaryPopulated(provinceId) {
        return _info.hasOwnProperty(provinceId);
    },

    init() {

        if (_nationInfo)
            return;

        CommonQuery.getNation().first().then((nation) => {

            CommonQuery.getProvinceNames().find().then((list)=> {
                _raw.push({key:"IDN",name:"Indonesia"})
                list.forEach((e)=> {
                    _raw.push({
                        key: e.get('locale'),
                        name: e.get('name')
                    })
                })

                StatisticQuery.getNationalServiceDetails().find().then((list)=> {

                    if (list.length == 0) {
                        SummaryStore.emitChange()
                        return;
                    }

                    _nationInfo = list.reduce((acc, e)=> {
                        acc["totalDuration"] += e.get('total_duration');
                        acc["stats"].push({
                            "name": e.get('service').get('name'),
                            "totalFee": e.get('total_fee'),
                            "totalReview": e.get('total_review'),
                            "totalDuration": e.get('total_duration')
                        });
                        return acc;
                    }, {
                        name: "Indonesia",
                        totalRating: nation.get('total_rating'),
                        totalFee:  nation.get('total_fee'),
                        totalReview:  nation.get('total_review'),
                        totalDuration: 0,
                        stats: []
                    })

                    this.emitChange()
                });
            })
        })



    }

})

AppDispatcher.register((action) => {
    switch (action.actionType) {
        case MapConstants.SELECT_CATEGORY:
            SummaryStore.setCategory(action.category)
            break;
        case MapConstants.POPULATE_PROVINCE:

            if (!action.province || SummaryStore.isSummaryPopulated(action.province))
                break;

            CommonQuery.getProvinceByLocale(action.province).first().then((province) => {
                StatisticQuery.getProvinceServiceDetailsByLocale(action.province).find().then((list)=> {

                    let init = {
                        name: province.get('name'),
                        totalRating: province.get('total_rating'),
                        totalFee: province.get('total_fee'),
                        totalReview: province.get('total_review'),
                        totalDuration: 0,
                        stats: []
                    }

                    if (list.length == 0) {
                        SummaryStore.setSummary(action.province, init);
                        return;
                    }

                    SummaryStore.setSummary(action.province, list.reduce((acc, e)=> {
                        acc["totalDuration"] += e.get('total_duration');
                        acc["stats"].push({
                            "name": e.get('service').get('name'),
                            "totalFee": e.get('total_fee'),
                            "totalReview": e.get('total_review'),
                            "totalDuration": e.get('total_duration')
                        });
                        return acc;
                    }, init))
                });
            })

            break;

        default:
        // nothingness
    }


    return true
})

module.exports = SummaryStore
