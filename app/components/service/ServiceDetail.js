import React from 'react'
import Parse from 'parse'

import { Link } from 'react-router'

import Loading from '../template/Loading'

import StringConstants from '../../constants/StringConstants'

const styles = {
    info: {
        background: "#9DBBD0",
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    title: {
        fontSize: "2em",
        fontWeight: "bold"
    },
    content: {
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    entry: {
        paddingBottom: "10px"
    }
}

class ServiceDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "services": []
        }

        this.componentWillMount.bind(this);
    }

    componentWillMount() {
        new Parse.Query('Service').get(this.props.params.serviceId).then((service) => {
            this.setState({"service": service});
        });
    }

    render() {

        if (!this.state.service)
            return (
                <div><Loading /></div>
            );

        let fee = [];
        for (var temp in this.state.service.get("fee")) {
            fee.push(<div><strong>{temp}</strong> Rp. {this.state.service.get("fee")[temp]}</div>);
        }

        return (
            <div>
                <section style={styles.info}>
                    <div className="row">
                        <div className="small-12 columns">
                            <div style={styles.title}>{this.state.service.get("name")}</div>

                            <section>
                                <div className="row">
                                    <div className="large-12 columns">
                                        {this.state.service.get("description")}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <div className="row" style={styles.content}>
                    <div className="small-4 columns">
                        <strong>Lokasi Pembuatan</strong>
                    </div>
                    <div style={styles.entry} className="small-8 columns">
                        {this.state.service.get("location")}&nbsp;
                    </div>
                    <div className="small-4 columns">
                        <strong>Biaya</strong>
                    </div>
                    <div style={styles.entry} className="small-8 columns">
                        {fee}&nbsp;
                    </div>
                    <div className="small-4 columns">
                        <strong>Persyaratan</strong>
                    </div>
                    <div style={styles.entry} className="small-8 columns">
                        {this.state.service.get("procedures").requirement.map((e)=> {
                            return <li>{e}</li>
                        })}&nbsp;
                    </div>
                    <div className="small-4 columns">
                        <strong>Langkah</strong>
                    </div>
                    <div style={styles.entry} className="small-8 columns">
                        {this.state.service.get("procedures").steps.map((e)=> {
                            return <li>{e}</li>
                        })}&nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

ServiceDetail.defaultProps = {
    params: {
        "serviceId": undefined
    }
};
export default ServiceDetail
