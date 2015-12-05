import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'
import { Link } from 'react-router'

import Colors from '../../constants/JendelaColors'
import Rating from '../template/Rating'
import PanelInfo from '../panel/PanelInfo'
import PanelDetailRow from '../panel/PanelDetailRow'

import CommonQuery from '../../queries/CommonQuery'
import StatisticQuery from '../../queries/StatisticQuery'

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

class ReviewLocation extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            location: undefined,
            isNotFound: false
        }
    }

    componentDidMount() {
        this.updateState()
    }

    componentWillReceiveProps() {
        this.setState({location: undefined, details: undefined, isNotFound: false})
        this.updateState()
    }

    updateState() {

        const { provinceId } = this.props

        if (provinceId) {
            CommonQuery.getProvince().get(provinceId).then((province)=> {
                StatisticQuery.getProvinceServiceDetails(provinceId).find().then((details) => {
                    this.setState({location: province, details: details})
                }, () => {
                    this.setState({isNotFound: true})
                })
            }, ()=> {
                this.setState({isNotFound: true})
            })
        } else {
            CommonQuery.getNation().first().then((nation)=> {
                StatisticQuery.getNationalServiceDetails().first().then((detail) => {
                    nation.set('name', 'Indonesia')
                    nation.set('rating', Math.floor(nation.get('total_rating') / nation.get('total_review')))
                    this.setState({location: nation, details: [detail]})
                }, () => {
                    this.setState({isNotFound: true})
                })
            }, ()=> {
                this.setState({isNotFound: true})
            })
        }
    }

    render() {
        const { location, details } = this.state

        if (!location || !details) {
            if (!this.state.isNotFound)
                return (
                    <section className="row" style={styles.container}>
                        <div className="small-12 columns">
                            <Loading />
                        </div>
                    </section>
                );
            else
                return undefined;
        }

        const totalReview = location.get('total_review') ? location.get('total_review') : 0
        const totalFee = `Rp. ${location.get('total_fee') ? location.get('total_fee') : 0}`
        const name = location.get('name')
        const rating = location.get('rating')

        return (
            <section className="row" style={styles.container}>
                <div className="small-12 medium-8 columns" style={{ marginBottom: "1em" }}>
                    <h3 style={styles.title}>
                        <span style={{ marginRight: "0.6em" }}>{ name }</span>
                        <Rating rating={rating} size="0.8em"/>
                    </h3>
                </div>
                <div className="small-12 medium-4 columns">
                    <Link to={"/addreview/"+location.id} className="button large success expanded" style={{ marginRight: 0 }}>
                        <img src="/img/icon-pen.png" style={{ marginRight: '0.8em' }}/>
                        <strong>Tulis ulasan</strong>
                    </Link>
                </div>

                <div className="small-12 medium-4 columns">
                    <PanelInfo
                        icon={ "img/icon-panel-review.png" }
                        text={ totalReview }
                        label={ "Ulasan" }/>
                    <PanelInfo
                        icon={ "img/icon-panel-money.png" }
                        text={ totalFee }
                        label={ "Total Biaya" }/>
                </div>
                <div className="small-12 medium-4 columns">
                    {details
                        .filter((e, idx) => (idx % 2 == 0))
                        .map((e, idx) => {
                            const nominal = `Rp. ${(e.get('total_fee') / e.get('total_review')).toFixed(2)}`
                            return <PanelDetailRow
                                key={e.id}
                                title={e.get('service').get('name')}
                                nominal={nominal}/>
                        })}
                </div>
                <div className="small-12 medium-4 columns">
                    {details
                        .filter((e, idx) => (idx % 2 == 1))
                        .map((e, idx) => {
                            const nominal = `Rp. ${(e.get('total_fee') / e.get('total_review')).toFixed(2)}`
                            return <PanelDetailRow
                                key={e.id}
                                title={e.get('service').get('name')}
                                nominal={nominal}/>
                        })}
                </div>
            </section>
        )
    }
}

ReviewLocation.defaultProps = {serviceId: undefined}

export default ReviewLocation
