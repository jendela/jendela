import React from 'react'
import Indonesia from './Indonesia'
import SummaryPanel from './SummaryPanel'
import MapSelection from './MapSelection'
import { m } from '../../helper.js'

const height = 520
const width = 860
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
        height: height,
        paddingRight: 0
    },
    panel: {
        height: height,
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: '200px'
    },
    customRow: {
        maxWidth: '76rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: '#D5EEFF'
    }
}

class Maps extends React.Component {
    render() {
        return (
            <section id="mapSection" style={styles.mapSection} className="show-for-large">
                <div style={styles.filter}>
                    <div className="row">
                        <div className="large-12 columns">
                            <MapSelection />
                        </div>
                    </div>
                </div>

                <div className="row" style={styles.customRow} >
                    <div className="shrink columns" style={styles.map}>
                        <Indonesia
                            width={width} height={height}
                            centerX={118} centerY={-3}
                            scale={1070} />
                    </div>

                    <div className="columns" style={styles.panel}>
                        <SummaryPanel />
                    </div>
                </div>
            </section>
        )
    }
}

export default Maps
