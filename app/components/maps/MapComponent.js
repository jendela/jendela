'use strict'

import React from 'react'
import Indonesia from './Map'
import SummaryPanel from './SummaryPanel'
import MapSelection from './MapSelection'

const height = 420
const styles = {
    mapSection: {
        width: '100%',
        maxWidth: '1440px',
        background: '#D5EEFF'
    },
    filter: {
        background: '#2D3B54',
    },
    map: {
        height: height
    },
    panel: {
        height: height
    }
}

class MapComponent extends React.Component {
    render() {
        return (
            <section id="mapSection" style={styles.mapSection}>
                <div style={styles.filter}>
                    <div className="row">
                        <div className="large-12 columns">
                            <MapSelection />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="large-9 columns" style={styles.map}>
                        <Indonesia
                            width={height * 2} height={height}
                            centerX={118} centerY={-3}
                            scale={1050} />
                    </div>

                    <div className="large-3 columns" style={styles.panel}>
                        <SummaryPanel />
                    </div>
                </div>


            </section>
        )
    }
}

export default MapComponent
