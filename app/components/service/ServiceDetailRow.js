import React from 'react';

class ServiceDetailRow extends React.Component {
  render() {
    const styles = {
      container: {
        marginBottom: '1.2em'
      },
      title: {
        fontWeight: 900,
        textTransform: 'uppercase',
        color: '#88bcb4',
      },
    };
    return (
      <div className="row" style={styles.container}>
        <div className="small-12 medium-4 columns">
          <h6 style={styles.title}>{this.props.title}</h6>
        </div>
        <div style={{ paddingBottom: '10px' }} className="small-12 medium-8 columns">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ServiceDetailRow.defaultProps = {title: ''};

export default ServiceDetailRow;
