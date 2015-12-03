'use strict'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter} from 'events'
import assign from 'react/lib/Object.assign'
import MapConstants from '../constants/MapConstants'

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

        StatisticQuery.getProvinceNames().find().then((list)=> {
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
                    acc["totalRating"] += e.get('total_rating');
                    acc["totalFee"] += e.get('total_fee');
                    acc["totalReview"] += e.get('total_review');
                    acc["stats"].push({
                        "name": e.get('service').get('name'),
                        "totalFee": e.get('total_fee'),
                        "totalReview": e.get('total_review')
                    });
                    return acc;
                }, {
                    name: "Indonesia",
                    totalRating: 0,
                    totalFee: 0,
                    totalReview: 0,
                    stats: []
                })

                this.emitChange()
            });
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

            StatisticQuery.getProvince(action.province).first().then((province) => {
                StatisticQuery.getProvinceServiceDetails(action.province).find().then((list)=> {

                    let init = {
                        name: province.get('name'),
                        totalRating: 0,
                        totalFee: 0,
                        totalReview: 0,
                        stats: []
                    }

                    if (list.length == 0) {
                        SummaryStore.setSummary(action.province, init);
                        return;
                    }

                    SummaryStore.setSummary(action.province, list.reduce((acc, e)=> {
                        acc["totalRating"] += e.get('total_rating');
                        acc["totalFee"] += e.get('total_fee');
                        acc["totalReview"] += e.get('total_review');
                        acc["stats"].push({
                            "name": e.get('service').get('name'),
                            "totalFee": e.get('total_fee'),
                            "totalReview": e.get('total_review')
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
