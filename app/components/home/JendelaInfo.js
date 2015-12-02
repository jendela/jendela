import React from 'react'

const styles = {
    container: {
        paddingTop: "1em",
        background: "#FFF"
    }
}

class JendelaInfo extends React.Component {
    _renderTitle() {
        const styles = {
            info: {
                background: "#FFF",
                borderRadius: "50%",
                marginRight: "0.3em",
                marginTop: "-5px",
                height: "1.1em",
                width: "1.1em"
            },
            title: {
                fontWeight: 900,
                color: "#2d4771"
            }
        }

        return (
            <h2>
                <img src="img/icon-jendela-info.png" style={styles.info} />
                <span style={styles.title}>Apa fungsi Jendela?</span>
            </h2>
        )
    }

    render() {
        return (
            <section style={styles.container}>
                <div className="row">
                    <div className="small-12 large-12 columns">
                        { this._renderTitle() }
                    </div>

                    <div className="small-12 large-12 columns">
                        <em>TODO: implement JendelaInfo page</em>
                    </div>
                </div>


            </section>
        )
    }
}

export default JendelaInfo
