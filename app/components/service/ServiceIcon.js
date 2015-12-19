import React from 'react';
import { Link } from 'react-router';

class ServiceIcon extends React.Component {
  render() {
    const { key, serviceId, iconPath, name } = this.props;
    const styles = {
      container: {
        marginTop: '1em',
        marginBottom: '1em'
      },
      image: {
        width: '100%',
        height: 'auto'
      },
      title: {
        marginTop: '1em',
        color: '#67707c',
        fontWeight: 900,
        textAlign: 'center',
        fontSize: '0.9em',
        textTransform: 'uppercase'
      }
    };
    return (
      <div className="small-6 medium-3 large-2 columns" style={styles.container} key={key}>
        <Link to={`/services/${serviceId}`}>
          <img src={`img/${iconPath}`} style={styles.image}/>
          <div style={styles.title}>{name} &raquo;</div>
        </Link>
      </div>
    );
  }
}

export default ServiceIcon;
