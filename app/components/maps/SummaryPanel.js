'use strict'

import React from 'react'
import { Link } from 'react-router'
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

    _renderPanelInfo(icon, value, label) {
        let styles = {
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

        return (
            <div className="row" style={styles.panel}>
                <div className="shrink columns" style={styles.icon}>
                    <img src={icon} />
                </div>
                <div className="columns" style={styles.info}>
                    <div style={styles.text}>{value}</div>
                    <div style={styles.label}>{label}</div>
                </div>
            </div>
        )
    }

    _renderAverageTable(values) {
        let styles = {
            table: {
                marginBottom: '1em'
            },
            row: {
                borderTop: "1px solid #EEE",
                paddingTop: "2px",
                paddingBottom: "2px"
            },
            title: {
                fontWeight: 900,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#88bcb4",
                fontSize: '0.8em'
            },
            nominal: {
                fontWeight: 900,
                color:"#8c9db8",
                fontSize: '0.9em'
            }
        }
        return (
            <div style={styles.table}>
                {values.map((average, idx) => {
                    return (
                        <div className="row" key={idx} style={styles.row}>
                            <div className="columns" style={styles.title}>{average.title}</div>
                            <div className="columns" style={styles.nominal}>{average.nominal}</div>
                        </div>
                    )
                })}
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
            { 'title': 'Kartu Keluarga', 'nominal': summary.avgKK },
            { 'title': 'Akta Nikah', 'nominal': summary.avgAkta },
            { 'title': 'SIM', 'nominal': summary.avgKawin },
            { 'title': 'STNK', 'nominal': summary.avgKawin },
            { 'title': 'Akta Cerai', 'nominal': summary.avgKawin },
            { 'title': 'Akta Lahir', 'nominal': summary.avgKawin }
        ])

        return (
            <div className="callout" style={styles.panel}>

                <div style={styles.title}>{summary.title}</div>
                {rating}

                <div style={{ marginBottom: '12px'}}>
                    {totalReviewInfo}
                    {totalFeeInfo}
                </div>

                <div style={styles.title}>Informasi rata-rata</div>
                {averageTable}

                <Link to="/statistic" className="expanded button success">
                    <img src="/img/icon-eye.png" style={{ marginRight: '1em' }} />
                    <strong>Lihat statistik selengkapnya</strong>
                </Link>
            </div>
        )
    }
}

export default SummaryPanel
