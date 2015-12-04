import React from 'react'
import Parse from 'parse'

import { Link } from 'react-router'

import StringConstants from '../../constants/StringConstants'
import Title from '../template/Title'

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

    _renderServicesLink(service, idx) {
        const styles = {
            container: {
                marginTop: "1em",
                marginBottom: "1em"
            },
            image: {
                width: "100%",
                height: "auto"
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
            <div className="small-6 medium-3 large-2 columns" style={styles.container} key={idx}>
                <Link to={`/services/${service.id}`} >
                    <img src={`img/${service.get("iconPath")}`} style={styles.image} />
                    <div style={styles.title}>{service.get("name")} &raquo;</div>
                </Link>
            </div>
        )
    }

    render() {
        return (
            <div style={styles.serviceSection}>

                <Title
                    text="Informasi layanan Pemerintah Daerah"
                    iconPath="img/icon-title-services.png"
                    color="#FFF" />

                <section style={styles.content} className="row">
                    { this.state.services.map((service, idx) => this._renderServicesLink(service, idx)) }
                </section>
            </div>
        );
    }
}

export default Service
