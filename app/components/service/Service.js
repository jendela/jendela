import React from 'react'
import Parse from 'parse'

import { Link } from 'react-router'

import StringConstants from '../../constants/StringConstants'

const styles = {
    serviceSection: {
        paddingTop: "1em",
        background: "#000e25 url('img/dark-bg-texture.png')"
    }
}

class Service extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "services": []
        }

        this.componentWillMount.bind(this);
    }

    componentWillMount() {
        new Parse.Query('Service').select(["name"]).find().then((services) => {
            this.setState({"services": services});
        });
    }

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
            <div className="columns">
                <h2>
                    <img src="img/icon-info-pemda.png" style={styles.info} />
                    <span style={styles.title}>Informasi layanan Pemerintah Daerah</span>
                </h2>
            </div>
        )
    }

    _renderServicesLink(service, idx) {
        const styles = {
            container: {
                marginTop: "1em",
                marginBottom: "1em"
            },
            image: {
                width: "131px",
                height: "131px"
            },
            title: {
                marginTop: "1em",
                color: "#67707c",
                fontWeight: 900,
                textAlign: "center",
                fontSize: "0.9em",
                textTransform: "uppercase"
            }
        }
        return (
            <div className="shrink columns" style={styles.container}>
                <Link to={"/services/"+service.id} key={idx}>
                    <img src="img/icon-placeholder.png" style={styles.image} />
                    <div style={styles.title}>{service.get("name")} &raquo;</div>
                </Link>
            </div>
        )
    }

    render() {
        return (
            <div style={styles.serviceSection}>

                <div className="row">
                    { this._renderTitle() }
                </div>

                <section style={styles.content} className="row">
                    { this.state.services.map((service, idx) => this._renderServicesLink(service, idx)) }
                </section>
            </div>
        );
    }
}

export default Service
