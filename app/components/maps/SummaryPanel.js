import React from 'react'
import { Link } from 'react-router'
import MapStore from '../../stores/MapStore'
import SummaryStore from '../../stores/SummaryStore'
import { m } from '../../helper'
import Colors from '../../constants/JendelaColors'
import Rating from '../template/Rating'
import Loading from '../template/Loading'

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
    }

    componentDidMount() {
        MapStore.addChangeListener(this._onChange)
        SummaryStore.addChangeListener(this._onChange)
        SummaryStore.init()
    }

    componentWillUnmount() {
        MapStore.removeChangeListener(this._onChange)
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

    _renderPanelInfo(icon, value, label) {
        let styles = {
            icon: {
                width: '25%',
                height: 'auto',
                paddingBottom: '4px',
                paddingTop: '4px'
            },
            info: {
                width: '75%',
                paddingLeft: 0
            },
            text: {
                color: Colors.blue,
                fontWeight: 900,
                fontSize: '1.5em',
                marginBottom: '-10px'
            },
            label: {
                color: Colors.green,
                fontWeight: 900
            }
        }

        return (
            <div className="row" style={styles.panel}>
                <div className="shrink columns" style={styles.icon}>
                    <img src={icon}/>
                </div>
                <div className="columns" style={styles.info}>
                    <div style={styles.text}>{value}</div>
                    <div style={styles.label}>{label}</div>
                </div>
            </div>
        )
    }

    _renderAverageTable(values, category) {
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
                textTransform: "uppercase",
                color: "#88bcb4",
                fontSize: '0.8em'
            },
            nominal: {
                fontWeight: 900,
                color: "#8c9db8",
                fontSize: '0.9em'
            }
        }

        let renderAverage;
        if (category == "data.averageTime")
            renderAverage = (e) => {return e + " Hari"};
        else
            renderAverage = (e) => {return "Rp. "+ numberWithCommas(e);};

        return (
            <div style={styles.table}>
                {values.map((average, idx) => {
                    return (
                        <div className="row" key={idx} style={styles.row}>
                            <div className="columns" style={styles.title}>{average.title}</div>
                            <div className="columns" style={styles.nominal}>{renderAverage(average.nominal)}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    _calculateNominal(e, category) {
        if (category == "data.averageFee") {
            return e.totalReview ? e.totalFee / e.totalReview : 0;
        } else if (category == "data.totalFee") {
            return e.totalFee;
        } else if (category == "data.averageTime")
            return e.totalReview ? e.totalDuration / e.totalReview : 0;
    }

    _getStatsName(category) {
        if (category == "data.averageFee") {
            return "Informasi Rata-Rata Biaya";
        } else if (category == "data.totalFee") {
            return "Informasi Total Biaya";
        } else
            return "Informasi Rata-Rata Waktu";
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
        const totalReviewInfo = this._renderPanelInfo(
            "img/icon-panel-review.png",
            summary.totalReview,
            "Ulasan"
        )
        const totalFeeInfo = this._renderPanelInfo(
            "img/icon-panel-money.png",
            "Rp. "+numberWithCommas(summary.totalFee),
            "Total biaya"
        )
        const titleTable = summary.totalReview ? <div style={styles.title}>{this._getStatsName(category)}</div> : undefined;
        const averageTable = this._renderAverageTable(summary.stats.map((e)=> {
            return {'title': e.name, 'nominal': this._calculateNominal(e, category)};
        }), category)

        return (
            <div className="callout" style={styles.panel}>

                <div style={styles.title}>{summary.name}</div>

                <Rating rating={summary.totalReview?summary.totalRating / summary.totalReview:0}/>

                <div style={{ marginBottom: '12px'}}>
                    {totalReviewInfo}
                    {totalFeeInfo}
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default SummaryPanel
