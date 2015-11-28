'use strict'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter} from 'events'
import assign from 'react/lib/Object.assign'

const _raw = [
  {key: "AC", name: "Aceh"},
  {key: "BA", name: "Bali"},
  {key: "BB", name: "Bangka-Belitung"},
  {key: "BE", name: "Bengkulu"},
  {key: "BT", name: "Banten"},
  {key: "GO", name: "Gorontalo"},
  {key: "IB", name: "Irian Jaya Barat"},
  {key: "JA", name: "Jambi"},
  {key: "JI", name: "Jawa Timur"},
  {key: "JK", name: "Jakarta Raya"},
  {key: "JR", name: "Jawa Barat"},
  {key: "JT", name: "Jawa Tengah"},
  {key: "KB", name: "Kalimantan Barat"},
  {key: "KI", name: "Kalimantan Timur"},
  {key: "KR", name: "Kepulauan Riau"},
  {key: "KS", name: "Kalimantan Selatan"},
  {key: "KT", name: "Kalimantan Tengah"},
  {key: "LA", name: "Lampung"},
  {key: "MA", name: "Maluku"},
  {key: "MU", name: "Maluku Utara"},
  {key: "NB", name: "Nusa Tenggara Barat"},
  {key: "NT", name: "Nusa Tenggara Timur"},
  {key: "PA", name: "Papua"},
  {key: "RI", name: "Riau"},
  {key: "SB", name: "Sumatera Barat"},
  {key: "SE", name: "Sulawesi Selatan"},
  {key: "SG", name: "Sulawesi Tenggara"},
  {key: "SL", name: "Sumatera Selatan"},
  {key: "SR", name: "Sulawesi Barat"},
  {key: "ST", name: "Sulawesi Tengah"},
  {key: "SU", name: "Sumatera Utara"},
  {key: "SW", name: "Sulawesi Utara"},
  {key: "YO", name: "Yogyakarta"},
  {key: "IDN", name: "Indonesia"},
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
      avgKTP: total2,
      avgKK: total2,
      avgAkta: total2,
      avgKawin: total2
    }

    acc[el.key] = summary
    return acc
  }, {})

const SummariesStore = assign(EventEmitter.prototype, {

  getSummaryForProvinceId(province) {
    let key = province.replace('ID.', '')
    if (!_summaries.hasOwnProperty(key)) {
      return _summaries.IDN
    }
    return _summaries[key]
  }

})

module.exports = SummariesStore
