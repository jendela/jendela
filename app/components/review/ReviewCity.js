import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'
import { Link } from 'react-router'

import Colors from '../../constants/JendelaColors'
import Rating from '../template/Rating'
import PanelInfo from '../panel/PanelInfo'

// do we need this 'moment'?
var moment = require('moment')
moment.locale("id-ID")

const styles = {
    container: {
        background: "#FFF",
        marginBottom: "1em",
        paddingTop: "1em",
        paddingBottom: "1em"
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 900,
        color: Colors.blue,
    },
    info: {
        color: "#8c9db8",
        fontWeight: 600
    }
}

class ReviewCity extends React.Component {

    render() {

        let { city } = this.props
        // city = this.props.city[0]

        const totalReview = 1000
        const totalFee = "Rp. 51.000.000.000"
        const name = "Indonesia"
        const rating = 5

        return (
            <section className="row" style={styles.container}>
                <div className="small-12 medium-6 columns" style={{ marginBottom: "1em" }}>
                    <h3 style={styles.title}>
                        <span style={{ marginRight: "0.6em" }}>{ name }</span>
                        <Rating rating={rating} size="0.8em" />
                    </h3>
                    <div style={styles.info}>Basuki Purnama</div>
                    <div style={styles.info}><a href="http://www.jakarta.go.id">http://www.jakarta.go.id</a></div>
                </div>
                <div className="small-12 medium-6 columns">
                    <Link to="/addreview" className="button large success float-right">
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
                <div className="small-12 medium-8 columns">
                    <span>Test</span>
                </div>
            </section>

        )

        //////

        if (city.length == 0) {
            return null
        }

        city = this.props.city[0]

        return (
            <section className="row">
                <div className="large-12 columns">
                    <div className="row">
                        <div className="small-6 columns">
                            <h3>{city.name}</h3>
                        </div>
                        <div className="small-4 columns">
                            <button type="button" className="button" style={{background:'#31A694'}}>Tulis Ulasan
                            </button>
                            <button type="button" className="button" style={{background:'#31A694'}}>Share</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="large-3 columns">
                            <div>Total Ulasan: {city.total_review ? city.total_review : 0}</div>
                            <div>Total Biaya: Rp. {city.total_fee ? city.total_fee : 0}</div>
                        </div>
                        <div className="small-9 columns">
                            <div className="row">
                                {this.props.details.length == 0 ?
                                    <p>Kota ini belum memiliki statistik, saatnya berkontribusi!</p>
                                    : undefined}
                                {this.props.details.map((e)=> {
                                    return <div key={e.objectId} className="large-3 columns">
                                        <div>Rata {e.service.name} Rp. {(e.total_fee / e.total_review).toFixed(2)}</div>
                                    </div>;
                                })}
                                <div className="large-3 columns">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ReviewCity.defaultProps = { reviews: [] }

export default ReviewCity
