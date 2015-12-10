import React from 'react'
import { m } from '../../helper'

const styles = {
    dark: {
        background: "#010E25",
    },
    copyright: {
        fontSize: "0.8em",
        color: "#FFF",
        textTransform: "uppercase",
        fontWeight: 900,
        letterSpacing: '1px',
        paddingTop: '1.5em',
        paddingBottom: '1.5em'
    }
}

class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <section style={styles.dark}>
                <div className="row">
                    <div className="small-12 large-6 columns">
                        <div style={styles.copyright}>
                            Geo data is provided by <a href="http://www.naturalearthdata.com">Natural Earth</a>
                            <br />
                            Jende.la &copy;  {year}
                        </div>
                    </div>
                    <div className="small-12 large-6 columns">
                        <ul className="vertical medium-horizontal menu footer-link" style={styles.copyright} >
                            <li><a href="mailto:jendela.dev@gmail.com">Email</a></li>
                            <li><a href="https://twitter.com/jende_la">Twitter</a></li>
                            <li><a href="https://github.com/jendela/jendela">Github</a></li>
                            <li><a href="https://www.youtube.com/channel/UCgTdWEJFSFuDQgX0BxxQ2uw">Youtube</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default Footer
