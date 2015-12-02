import React from 'react'

const styles = {
    container: {
        paddingTop: "2em",
        background: "#368baf url('img/light-texture.png')"
    }
}

class GoMobile extends React.Component {
    _renderTitle() {
        const styles = {
            info: {
                background: "#FFF",
                padding: "0.2em",
                borderRadius: "50%",
                marginRight: "0.3em",
                marginTop: "-5px",
                height: "1em",
                width: "1em"
            },
            title: {
                fontWeight: 900,
                color: "#FFF"
            }
        }

        return (
            <h2>
                <img src="img/icon-go-mobile.png" style={styles.info} />
                <span style={styles.title}>Kirim ulasan dengan Mobile App</span>
            </h2>
        )
    }

    render() {
        return (
            <section style={styles.container}>
                <div className="row">
                    <div className="columns">
                        { this._renderTitle() }
                        <em>TODO: implement GoMobile page</em>
                    </div>
                    <div className="shrink columns show-for-medium">
                        <img src="img/phone.png" />
                    </div>
                </div>
            </section>
        )
    }
}

export default GoMobile
