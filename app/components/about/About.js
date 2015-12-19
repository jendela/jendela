import React from 'react';
import Team from './Team';
import FAQ from './FAQ';

class About extends React.Component {
  render() {
    const styles = {
      info: {
        background: '#f2faff',
        paddingTop: '25px',
        paddingBottom: '25px'
      }
    };

    return (
      <div>
        <section style={styles.info}>
          <Team />
        </section>

        <section>
          <FAQ />
        </section>
      </div>
    );
  }
}

export default About;
