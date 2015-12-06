import React from 'react'
import { Link } from 'react-router'
import MapStore from '../../stores/MapStore'
import SummaryStore from '../../stores/SummaryStore'
import { m, numberWithCommas } from '../../helper'
import Colors from '../../constants/JendelaColors'
import Rating from '../template/Rating'
import Loading from '../template/Loading'

import PanelInfo from '../panel/PanelInfo'
import PanelDetailRow from '../panel/PanelDetailRow'

const styles = {
    panel: {
        marginTop: '1em'
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 900,
        color: Colors.blue,
        fontSize: '1.4em'
    },
    list: {
        listStyleType: "none",
        paddingLeft: 0
    }
}

class SummaryPanel extends React.Component {

    constructor(props) {
        super(props)

        this._onChange = this._onChange.bind(this)
        this.state = {province: ''}

        SummaryStore.init()
    }

    componentDidMount() {
        SummaryStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        SummaryStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        let activeProvince = ''
        if (MapStore.highlightedProvince() !== '') {
            activeProvince = MapStore.highlightedProvince()
        } else if (MapStore.selectedProvince() !== '') {
            activeProvince = MapStore.selectedProvince()
        }

        this.setState({province: activeProvince})
    }

    // render helpers

    _renderAverageTable(values, category) {
        const renderAverage = (category == "data.averageTime") ? 
            (e) => {return e + " Hari"} :
            (e) => {return "Rp. "+ numberWithCommas(e)}

        return (
            <div style={{ marginBottom: '1em' }}>
                { values.map((average, idx) => {
                    return <PanelDetailRow key={idx} title={average.title} nominal={renderAverage(average.nominal)} />
                }) }
            </div>
        )
    }

    _calculateNominal(e, category) {
        if (category == "data.averageFee") {
            return e.totalReview ? (e.totalFee / e.totalReview).toFixed(2) : 0;
        } else if (category == "data.totalFee") {
            return e.totalFee;
        } else if (category == "data.averageTime")
            return e.totalReview ? (e.totalDuration / e.totalReview).toFixed(2) : 0;
    }

    _getStatsName(category) {
        if (category === "data.averageFee") {
            return "Informasi Rata-Rata Biaya"
        } else if (category === "data.totalFee") {
            return "Informasi Total Biaya"
        } else {
            return "Informasi Rata-Rata Waktu"
        }
    }

    render() {
        const { province } = this.state
        const summary = SummaryStore.getSummary(province)
        if (!summary) {
            return (
                <div className="callout" style={styles.panel}>
                    <Loading />
                </div>
            )
        }
        const category = SummaryStore.getCategory()
        const titleTable = summary.totalReview ? <div style={styles.title}>{this._getStatsName(category)}</div> : undefined;
        const averageTable = this._renderAverageTable(summary.stats.map((e)=> {
            return {'title': e.name, 'nominal': this._calculateNominal(e, category)};
        }), category)

        return (
            <div className="callout" style={styles.panel}>

                <div style={styles.title}>{summary.name}</div>

                <Rating rating={Math.floor(summary.totalReview?summary.totalRating / summary.totalReview:0)}/>

                <div style={{ marginBottom: '12px'}}>
                    <PanelInfo
                        icon={ "img/icon-panel-review.png" }
                        text={ summary.totalReview }
                        label={ "Ulasan" } />
                    <PanelInfo
                        icon={ "img/icon-panel-money.png" }
                        text={ `Rp. ${numberWithCommas(summary.totalFee)}` }
                        label={ "Total biaya" } />
                </div>

                {titleTable}
                {averageTable}

                <Link to="/statistic" className="expanded button success">
                    <img src="/img/icon-eye.png" style={{ marginRight: '1em' }}/>
                    <strong>Lihat statistik selengkapnya</strong>
                </Link>
            </div>
        )
    }
}

export default SummaryPanel
