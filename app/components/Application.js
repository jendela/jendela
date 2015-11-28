'use strict'

import React from 'react'
import MapComponent from './maps/MapComponent'
import Statistic from './Statistic'
import Review from './Review'

class Application extends React.Component {
    render() {

        return (
            <div>
                <div className="row">
                    <h3>Statistik</h3>
                    <Statistic />
                </div>

                <div className="row">
                    <h3>Map</h3>
                </div>
                <MapComponent />
                <div className="row">
                    <h3>Ulasan Terakhir</h3>
                    <Review />
                </div>
            </div>
        )
    }
}

export default Application
