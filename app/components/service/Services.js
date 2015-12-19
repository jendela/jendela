import React from 'react';
import Parse from 'parse';
import { m } from '../../helper';

import Title from '../template/Title';
import Loading from '../template/Loading';
import CommonQuery from '../../queries/CommonQuery';
import ServiceIcon from './ServiceIcon';

const styles = {
  container: {paddingTop: '25px'}
};

const homepageStyles = {
  titleColor: '#FFFFFF',
  background: {background: "#000e25 url('img/dark-bg-texture.png')"},
  iconPath: 'img/icon-title-services.png'
};

const sectionStyles = {
  titleColor: '#2d4771',
  background: {background: '#f2faff'},
  iconPath: 'img/icon-title-services-dark.png'
};

class Services extends React.Component {

  constructor(props) {
    super(props);

    this.state = {'services': []};
    this.componentWillMount.bind(this);
  }

  componentWillMount() {
    CommonQuery.getServiceNames().find().then((services) => {
      this.setState({'services': services});
    });
  }

  render() {
    const { isOnHomepage } = this.props;
    const selectedStyle = isOnHomepage ? homepageStyles : sectionStyles;

    const services = (this.state.services.length === 0) ? <Loading /> : (
      <div style={styles.content} className="row">
        { this.state.services.map((service, index) => {
          return <ServiceIcon
            key={index}
            serviceId={service.id}
            iconPath={service.get('iconPath')}
            name={service.get('name')}/>;
        })}
      </div>
    );

    return (
      <section style={m(styles.container, selectedStyle.background)}>
        <Title
          text="Informasi layanan Pemerintah Daerah"
          iconPath={selectedStyle.iconPath}
          color={selectedStyle.titleColor}/>

        { services }
      </section>
    );
  }
}

Services.defaultProps = {isOnHomepage: false};

export default Services;
