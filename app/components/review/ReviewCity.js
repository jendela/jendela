import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'
import { Link } from 'react-router'

import Colors from '../../constants/JendelaColors'
import Rating from '../template/Rating'
import PanelInfo from '../panel/PanelInfo'
import PanelDetailRow from '../panel/PanelDetailRow'

// do we need this 'moment'?
var moment = require('moment')
moment.locale("id-ID")

const styles = {
    container: {
        background: "#FFF",
        marginBottom: "1em",
        paddingTop: "1.3em",
        paddingBottom: "1.3em"
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 900,
        color: Colors.blue,
    }
}

class ReviewCity extends React.Component {

    render() {
        let { city, details } = this.props

        if (city.length == 0) {
            return null
        }

        city = this.props.city[0]

        const totalReview = city.total_review ? city.total_review : 0
        const totalFee = `Rp. ${city.total_fee ? city.total_fee : 0}`
        const name = city.name
        const rating = city.rating

        return (
            <section className="row" style={styles.container}>
                <div className="small-12 medium-8 columns" style={{ marginBottom: "1em" }}>
                    <h3 style={styles.title}>
                        <span style={{ marginRight: "0.6em" }}>{ name }</span>
                        <Rating rating={rating} size="0.8em" />
                    </h3>
                </div>
                <div className="small-12 medium-4 columns">
                    <Link to="/addreview" className="button large success expanded" style={{ marginRight: 0 }}>
                        <img src="/img/icon-pen.png" style={{ marginRight: '0.8em' }} />
                        <strong>Tulis ulasan</strong>
                    </Link>
                </div>

                <div className="small-12 medium-4 columns">
                    <PanelInfo
                        icon={ "img/icon-panel-review.png" }
                        text={ totalReview }
                        label={ "Ulasan" } />
                    <PanelInfo
                        icon={ "img/icon-panel-money.png" }
                        text={ totalFee }
                        label={ "Total Biaya" } />
                </div>
                <div className="small-12 medium-4 columns">
                    {details
                        .filter((e, idx) => (idx % 2 == 0))
                        .map( (e, idx) => {
                        const nominal = `Rp. ${(e.total_fee / e.total_review).toFixed(2)}`
                        return <PanelDetailRow
                            key={e.objectId}
                            title={e.title}
                            nominal={nominal} />
                    })}
                </div>
                <div className="small-12 medium-4 columns">
                    {details
                        .filter((e, idx) => (idx % 2 == 1))
                        .map( (e, idx) => {
                        const nominal = `Rp. ${(e.total_fee / e.total_review).toFixed(2)}`
                        return <PanelDetailRow
                            key={e.objectId}
                            title={e.service.name}
                            nominal={nominal} />
                    })}
                </div>
            </section>
        )
    }
}

ReviewCity.defaultProps = { reviews: [] }

export default ReviewCity
