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

        const { service } = this.state

        if (!service) {
            return <Loading />
        }

        let fee = [];
        for (var temp in service.get("fee")) {
            fee.push(<div><strong>{temp}</strong>: Rp. {service.get("fee")[temp]}</div>);
        }
        const requirement = service.get("procedures").requirement
        const steps = service.get("procedures").steps

        return (
            <div>
                <ServiceSummary
                    iconPath={`img/${service.get('iconPath')}`}
                    title={service.get("name")}
                    summary={service.get("description")} />

                <div style={styles.content}>
                    <ServiceDetailRow title={"Lokasi Pembuatan"} >
                        { service.get("location") }
                    </ServiceDetailRow>

                    <ServiceDetailRow title={"Biaya"} >
                        { (fee.length <= 0) ? "-" : fee }
                    </ServiceDetailRow>

                    <ServiceDetailRow title={"Persyaratan"} >
                        { (requirement.length <= 0) ? "-" : requirement.map((e)=> <li>{e}</li> ) }
                    </ServiceDetailRow>

                    <ServiceDetailRow title={"Langkah-langkah"} >
                        { (steps.length <= 0) ? "-" : steps.map((e)=> <li>{e}</li> ) }
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
