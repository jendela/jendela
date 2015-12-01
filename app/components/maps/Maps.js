import React from 'react'
import Indonesia from './Indonesia'
import SummaryPanel from './SummaryPanel'
import MapSelection from './MapSelection'
import { m } from '../../helper.js'

const height = 460
const width = 840
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

class Maps extends React.Component {
    render() {
        const mapStyles = {
            row: {
                maxWidth: '75.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                background: '#D5EEFF'
            },
            map: { width: '69.5%' },
            panel: { width: '30.5%' }
        }

        return (
            <section id="mapSection" style={styles.mapSection}>
                <div style={styles.filter}>
                    <div className="row">
                        <div className="large-12 columns">
                            <MapSelection />
                        </div>
                    </div>
                </div>

                <div className="row" style={mapStyles.row} >
                    <div className="large-9 columns" style={m(styles.map, mapStyles.map)}>
                        <Indonesia
                            width={height * 2} height={height}
                            centerX={118} centerY={-3}
                            scale={1050} />
                    </div>

                    <div className="large-3 columns" style={m(styles.panel, mapStyles.panel)}>
                        <SummaryPanel />
                    </div>
                </div>
            </section>
        )
    }
}

export default Maps
