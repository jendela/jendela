import React from 'react'

const styles = {
    dark: {
        background: "#010E25",
    },
    copyright: {
        fontSize: "0.8em",
        color: "#FFF",
        textAlign: "center",
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
                    <div className="large-12 columns">
                        <div style={styles.copyright}>
                            Geo data is provided by <a href="http://www.naturalearthdata.com">Natural Earth</a>
                            <br />
                            Jende.la &copy;  {year}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Footer
