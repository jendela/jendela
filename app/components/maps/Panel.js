'use strict'

import React from 'react'
import MapStore from '../../stores/MapStore'
import SummariesStore from '../../stores/SummariesStore'
import { m } from '../../helper'

var styles = {
  panel: {
    marginTop: '1em'
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 700
  },
  list: {
    listStyleType: "none",
    paddingLeft: 0
  },
  rating: {
    color: '#87BCB4',
    fontSize: '1em'
  },
  averageRow: {
    fontSize: '0.99em'
  }
}

class Panel extends React.Component {

  constructor(props) {
    super(props)

    this._onChange = this._onChange.bind(this)
    this.state = { province: '' }
  }

  componentDidMount() {
    MapStore.addChangeListener(this._onChange)
  }

  componentWillMount() {
    MapStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    this.setState({ province: MapStore.highlightedProvince() })
  }

  // render helpers

  _starRating(rating) {
    if (rating <= 0) { return '' }
    return '★' + this._starRating(rating - 1)
  }

  _renderRating(rating) {
    return (
      <span>
        <span style={styles.rating}>{this._starRating(rating)}</span>
        <span style={m(styles.rating, {color: '#AAAAAA'})}>{this._starRating(5 - rating)}</span>
      </span>
    )
  }

  _renderAverageTable(values) {
    return values.map((average, idx) => {
      return (
        <div className="row" key={idx} style={styles.averageRow}>
          <div className="large-5 columns">{average.title}</div>
          <div className="large-7 columns">{average.nominal}</div>
        </div>
      )
    })
  }


  render() {
    const { province } = this.state
    const summary = SummariesStore.getSummaryForProvinceId(province)

    const rating = this._renderRating(summary.rating)
    const averageTable = this._renderAverageTable([
      { 'title': 'KTP', 'nominal': summary.avgKTP },
      { 'title': 'Kartu Klg', 'nominal': summary.avgKK },
      { 'title': 'Akta Lahir', 'nominal': summary.avgAkta },
      { 'title': 'Akta Kawin', 'nominal': summary.avgKawin },
    ])

    return (
      <div className="callout" style={styles.panel}>
        <h5 style={styles.title}>{summary.title} <br/> {rating}</h5>

        <div>20000 Ulasan</div>
        <div>Total biaya: {summary.total}</div>

        <br/>
        <h5>Data rata-rata</h5>

        {averageTable}

        <br/>
        <button type="button" className="expanded button">Lihat data selengkapnya &rarr;</button>
      </div>
    )
  }

}

export default Panel
