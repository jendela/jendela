import React from 'react';

class Title extends React.Component {
  render() {
    const styles = {
      info: {
        marginRight: '0.3em',
        marginTop: '-5px',
        height: '1em',
        width: '1em'
      },
      title: {
        fontWeight: 900,
        color: this.props.color
      }
    };

    return (
      <div className="row">
        <div className="large-12 columns">
          <h2>
            <img src={this.props.iconPath} style={styles.info}/>
            <span style={styles.title}>{this.props.text}</span>
          </h2>
        </div>
      </div>
    );
  }
}

Title.defaultProps = {
  text: '',
  iconPath: '',
  color: '#222'
};

export default Title;
