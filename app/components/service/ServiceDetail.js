import React from 'react'
import Parse from 'parse'
import { Link } from 'react-router'

import Loading from '../template/Loading'
import ServiceSummary from './ServiceSummary'
import ServiceDetailRow from './ServiceDetailRow'

const styles = {
    content: {
        paddingTop: "25px",
        paddingBottom: "25px"
    }
}

class ServiceDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = { "services": [] }
        this.componentWillMount.bind(this);
    }

    componentWillMount() {
        new Parse.Query('Service').get(this.props.params.serviceId).then((service) => {
            this.setState({"service": service});
        })
    }

    render() {

        if (!this.state.service) {
            return <Loading />
        }

        let fee = [];
        for (var temp in this.state.service.get("fee")) {
            fee.push(<div><strong>{temp}</strong>: Rp. {this.state.service.get("fee")[temp]}</div>);
        }

        return (
            <div>
                <ServiceSummary
                    iconPath={`img/${this.state.service.get('iconPath')}`}
                    title={this.state.service.get("name")}
                    summary={this.state.service.get("description")} />

                <div style={styles.content}>
                    <ServiceDetailRow title={"Lokasi Pembuatan"} >
                        { this.state.service.get("location") }
                    </ServiceDetailRow>

                    <ServiceDetailRow title={"Biaya"} >
                        { (fee.length > 0) ? fee : "-" }
                    </ServiceDetailRow>

                    <ServiceDetailRow title={"Persyaratan"} >
                        { this.state.service.get("procedures").requirement.map((e)=> <li>{e}</li> ) }
                    </ServiceDetailRow>

                    <ServiceDetailRow title={"Langkah-langkah"} >
                        { this.state.service.get("procedures").steps.map((e)=> <li>{e}</li> ) }
                    </ServiceDetailRow>
                </div>
            </div>
        )
    }
}

ServiceDetail.defaultProps = {
    params: { "serviceId": undefined }
}

export default ServiceDetail
