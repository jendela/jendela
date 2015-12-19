import React from 'react';
import { m, numberWithCommas } from '../../helper';
import d3 from 'd3';
import Colors from '../../constants/JendelaColors';

const styles = {
  container: {
    background: '#000e25',
    marginBottom: '60px',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  title: {
    color: '#368baf',
    marginTop: '20px'
  },
  bar: {
    fill: Colors.green
  },
  nominal: {
    fill: '#368baf',
    font: "15px 'Roboto'",
    fontWeight: 600,
    textAnchor: 'end'
  },
  province: {
    fill: '#93c2ba',
    font: "15px 'Roboto'",
    fontWeight: 600,
  },
  line: {
    stroke: '#3E454D',
    strokeWidth: '1px'
  }
};

class Chart extends React.Component {
  render() {
    const { title, data } = this.props;
    const width = 900;
    const barHeight = 45;
    const barSpacing = 18;
    const height = (data.length * barHeight);

    const xNominal = 150;
    const xBar = 400;
    const x = d3.scale.linear()
      .domain([0, d3.max(data, (d) => {
        return d.value;
      })])
      .range([0, (width - xBar - 20)]);

    return (

      <div>
        <h4 style={styles.title}>{title}</h4>

        <svg ref='svg'
             width="100%" height="100%"
             viewBox={`0 0 ${width} ${height}`}
             preserveAspectRatio='xMidYMid meet'
             style={styles.container}>

          {data.map((d, idx) => {
            const isLast = (idx === (data.length - 1));
            const line = isLast ? null :
              <line x1={10} y1={barHeight} x2={width - 10} y2={barHeight} style={styles.line}/>;
            const yText = barSpacing + 10;

            const nominal = (d.value === undefined) ? 0 : d.value;

            return (
              <g key={idx} transform={`translate(0, ${(idx * barHeight)})`}>
                <text x={35} y={yText} style={styles.nominal}>{`${idx + 1}.`}</text>
                <text x={55} y={yText} style={styles.province}>{d.name}</text>
                <text x={xBar - 30} y={yText} style={styles.nominal}>{ `Rp. ${numberWithCommas(nominal)}` }</text>
                <rect x={xBar} y={barSpacing} width={x(d.value)} height={barHeight - (2 * barSpacing)}
                      style={styles.bar}/>
                { line }
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
}

Chart.defaultProps = {
  title: '',
  data: []
};

export default Chart;
