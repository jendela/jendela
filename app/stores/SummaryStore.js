'use strict'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter} from 'events'
import assign from 'react/lib/Object.assign'

const _raw = [
    {key: "IDN", name: "Indonesia"},
    {key: "ID.AC", name: "Aceh"},
    {key: "ID.BA", name: "Bali"},
    {key: "ID.BB", name: "Bangka-Belitung"},
    {key: "ID.BE", name: "Bengkulu"},
    {key: "ID.BT", name: "Banten"},
    {key: "ID.GO", name: "Gorontalo"},
    {key: "ID.IB", name: "Irian Jaya Barat"},
    {key: "ID.JA", name: "Jambi"},
    {key: "ID.JI", name: "Jawa Timur"},
    {key: "ID.JK", name: "Jakarta Raya"},
    {key: "ID.JR", name: "Jawa Barat"},
    {key: "ID.JT", name: "Jawa Tengah"},
    {key: "ID.KB", name: "Kalimantan Barat"},
    {key: "ID.KI", name: "Kalimantan Timur"},
    {key: "ID.KR", name: "Kepulauan Riau"},
    {key: "ID.KS", name: "Kalimantan Selatan"},
    {key: "ID.KT", name: "Kalimantan Tengah"},
    {key: "ID.LA", name: "Lampung"},
    {key: "ID.MA", name: "Maluku"},
    {key: "ID.MU", name: "Maluku Utara"},
    {key: "ID.NB", name: "Nusa Tenggara Barat"},
    {key: "ID.NT", name: "Nusa Tenggara Timur"},
    {key: "ID.PA", name: "Papua"},
    {key: "ID.RI", name: "Riau"},
    {key: "ID.SB", name: "Sumatera Barat"},
    {key: "ID.SE", name: "Sulawesi Selatan"},
    {key: "ID.SG", name: "Sulawesi Tenggara"},
    {key: "ID.SL", name: "Sumatera Selatan"},
    {key: "ID.SR", name: "Sulawesi Barat"},
    {key: "ID.ST", name: "Sulawesi Tengah"},
    {key: "ID.SU", name: "Sumatera Utara"},
    {key: "ID.SW", name: "Sulawesi Utara"},
    {key: "ID.YO", name: "Yogyakarta"}
]

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const _summaries = _raw
.reduce((acc, el) => {
    let money = Math.floor(Math.random() * 100)
    let total = 'Rp. ' + numberWithCommas(money * 10000000)
    let total2 = 'Rp. ' + numberWithCommas(money * 1000000)

    let summary = {
        title: el.name,
        rating: (money % 5) + 1,
        total: total,
        totalReviews: (money * 100),
        avgKTP: total2,
        avgKK: total2,
        avgAkta: total2,
        avgKawin: total2
    }

    acc[el.key] = summary
    return acc
}, {})

const SummaryStore = assign(EventEmitter.prototype, {

    getAllProvinces() {
        return _raw
    },

    getSummaryForProvinceId(provinceId) {
        if (!_summaries.hasOwnProperty(provinceId)) {
            return _summaries['IDN']
        }
        return _summaries[provinceId]
    }

})

module.exports = SummaryStore
