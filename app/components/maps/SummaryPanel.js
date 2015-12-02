'use strict'

import React from 'react'
import MapStore from '../../stores/MapStore'
import SummaryStore from '../../stores/SummaryStore'
import { m } from '../../helper'

const jendelaBlue = '#368baf'
const jendelaGreen = '#87BCB4'

const styles = {
    panel: {
        marginTop: '1em'
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 900,
        color: jendelaBlue,
        fontSize: '1.4em'
    },
    list: {
        listStyleType: "none",
        paddingLeft: 0
    },
    rating: {
        color: jendelaGreen,
        fontSize: '1.4em'
    },
    averageRow: {
        fontSize: '0.99em'
    }
}

const panelStyles = {
    icon: {
        width: '25%',
        height: 'auto',
        paddingRight: 0,
        paddingTop: '4px'
    },
    info: {
        width: '75%',
        paddingLeft: 0
    },
    text: {
        textTransform: 'uppercase',
        color: jendelaBlue,
        fontWeight: 900,
        fontSize: '1.5em',
        marginBottom: '-10px'
    },
    label: {
        color: jendelaGreen,
        fontWeight: 900
    }
}

class SummaryPanel extends React.Component {

    constructor(props) {
        super(props)

        this._onChange = this._onChange.bind(this)
        this.state = { province: '' }
    }

    componentDidMount() {
        MapStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        MapStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        let activeProvince = ''
        if (MapStore.highlightedProvince() !== '') {
            activeProvince = MapStore.highlightedProvince()
        } else if (MapStore.selectedProvince() !== '') {
            activeProvince = MapStore.selectedProvince()
        }

        this.setState({ province: activeProvince })
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

    _renderPanelInfo(icon, value, label) {
        return (
            <div className="row" style={{marginBottom: '4px'}}>
                <div className="columns" style={panelStyles.icon}>
                    <img src={icon} />
                </div>
                <div className="columns" style={panelStyles.info}>
                    <div style={panelStyles.text}>{value}</div>
                    <div style={panelStyles.label}>{label}</div>
                </div>
            </div>
        )
    }

    render() {
        const { province } = this.state
        const summary = SummaryStore.getSummaryForProvinceId(province)

        const rating = this._renderRating(summary.rating)
        const totalReviewInfo = this._renderPanelInfo("img/icon-panel-review.png", summary.totalReviews, "Ulasan")
        const totalFeeInfo = this._renderPanelInfo("img/icon-panel-money.png", summary.total, "Total biaya")

        const averageTable = this._renderAverageTable([
            { 'title': 'KTP', 'nominal': summary.avgKTP },
            { 'title': 'Kartu Klg', 'nominal': summary.avgKK },
            { 'title': 'Akta Lahir', 'nominal': summary.avgAkta },
            { 'title': 'Akta Kawin', 'nominal': summary.avgKawin },
        ])

        return (
            <div className="callout" style={styles.panel}>
                <div style={styles.title}>{summary.title}</div>

                {rating}
                {totalReviewInfo}
                {totalFeeInfo}

                <div style={styles.title}>Informasi rata-rata</div>
                {averageTable}

                <br />

                <button type="button" className="expanded button success">Lihat data selengkapnya &rarr;</button>
            </div>
        )
    }
}

export default SummaryPanel
