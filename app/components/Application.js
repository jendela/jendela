'use strict'

import React from 'react'

const styles = {
  landingBase: {
    minHeight: '20em',
    height: '100vh',
    display: 'block'
  },
  container: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  logo: {
    position: 'absolute',
    height: '6em',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -80%)'
  },
  soon: {
    position: 'absolute',
    fontSize: '0.7em',
    width: '100%',
    top: '30%',
    left: '50%',
    fontWeight: '700',
    textTransform: 'uppercase',
    transform: 'translate(-50%, -30%)',
    textAlign: 'center'
  }
}

class Application extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="small-12 large-11 large-centered columns">
          <div style={styles.landingBase}>
            <div style={styles.container}>
              <img style={styles.logo} src="img/logo.png" alt="six one three" />
              <span style={styles.soon}>soon at <a href="http://hackathonmerdeka.id/">hackathon merdeka 3.0</a></span>
            </div>
          </div>
        </div>
    </div>
    )
  }

}

export default Application
