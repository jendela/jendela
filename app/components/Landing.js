'use strict'

import React from 'react'

const styles = {
  landingBase: {
    minHeight: '20em',
    height: '90vh',
    display: 'block'
  },
  container: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  logo: {
    position: 'absolute',
    height: '10em',
    top: '90%',
    left: '50%',
    paddingBottom: '0em',
    transform: 'translate(-50%, -90%)'
  },
  soon: {
    position: 'absolute',
    fontSize: '1em',
    width: '100%',
    top: '50%',
    left: '50%',
    paddingTop: '1em',
    fontWeight: 800,
    textTransform: 'uppercase',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },
  copyright: {
    position: 'relative',
    top: '95%',
    fontWeight: 500,
    transform: 'translateY(-95%)',
    fontSize: '1em',
    width: '100%',
    textAlign: 'center'
  }
}

class Landing extends React.Component {

  render() {
    const year = new Date().getFullYear();

    return (
      <div className="row">
        <div className="small-12 large-11 large-centered columns">
          <div style={styles.landingBase}>
            <div style={styles.container}>
              <img style={styles.logo} src="img/logo.png" alt="six one three" />
              <span style={styles.soon}>soon at <a href="http://hackathonmerdeka.id/">hackathon merdeka 3.0</a></span>
            </div>
            <div style={styles.copyright}>
              Jende.la &copy; {year}
            </div>
          </div>
        </div>
    </div>
    )
  }

}

export default Landing
