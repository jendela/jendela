'use strict'

import React from 'react'
import Indonesia from './Map'
import SummaryPanel from './SummaryPanel'

const height = 420
const styles = {
  mapSection: {
    width: '100%',
    maxWidth: '1440px',
    height: height ,
    background: '#D5EEFF'
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
