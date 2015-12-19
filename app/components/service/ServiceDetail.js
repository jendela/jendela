import React from 'react';
import Parse from 'parse';
import { Link } from 'react-router';

import Loading from '../template/Loading';
import ServiceSummary from './ServiceSummary';
import ServiceDetailRow from './ServiceDetailRow';

const styles = {
  content: {
    paddingTop: '25px',
    paddingBottom: '25px'
  }
};

class ServiceDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'services': []};
    this.componentWillMount.bind(this);
  }

  componentWillMount() {
    new Parse.Query('Service').get(this.props.params.serviceId).then((service) => {
      this.setState({'service': service});
    });
  }

  render() {

    const { service } = this.state;

    if (!service) {
      return <Loading />;
    }

    const fee = formatFee(service.get('fee'));
    const requirement = service.get('procedures').requirement;
    const steps = service.get('procedures').steps;

    return (
      <div>
        <ServiceSummary
          iconPath={`img/${service.get('iconPath')}`}
          title={service.get('name')}
          summary={service.get('description')}/>

        <div style={styles.content}>
          <ServiceDetailRow title={"Lokasi Pembuatan"}>
            { service.get('location') }
          </ServiceDetailRow>

          <ServiceDetailRow title={"Biaya"}>
            { (fee.length <= 0) ? '-' : fee }
          </ServiceDetailRow>

          { (requirement.length <= 0) ? undefined :
            <ServiceDetailRow title={"Persyaratan"}>
              { requirement.map((e) => <li>{e}</li>) }
            </ServiceDetailRow>
          }

          { (steps.length <= 0) ? undefined :
            <ServiceDetailRow title={"Prosedur"}>
              { steps.map((e) => <li>{e}</li>) }
            </ServiceDetailRow>
          }


          <ServiceDetailRow title={"Durasi Pembuatan"}>
            { service.get('duration') }
          </ServiceDetailRow>
        </div>
      </div>
    );
  }
}

ServiceDetail.defaultProps = {
  params: {'serviceId': undefined}
};

function formatFee(inputFee) {
  if (Object.keys(inputFee).length === 1)
    return getPriceString(inputFee[1]);
  else {
    let fee = [];
    for (var temp in inputFee) {
      fee.push(<div><strong>{temp}</strong>: {getPriceString(inputFee[temp])}</div>);
    }
    return fee;
  }
}

function getPriceString(price) {
  return price ? 'Rp. ' + price : 'GRATIS';
}

export default ServiceDetail;
