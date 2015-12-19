import React from 'react';
import d3 from 'd3';
import topojson from 'topojson';
import CommonQuery from '../../queries/CommonQuery';

import { m } from '../../helper';
import MapActions from '../../actions/MapActions';
import SummaryActions from '../../actions/SummaryActions';
import MapStore from '../../stores/MapStore';
import Loading from '../template/Loading';
import SummaryStore from '../../stores/SummaryStore';

const styles = {
  province: {
    cursor: 'pointer'
  },
  provinceHighlighted: {
    fill: '#C2E699'
  },
  provinceSelected: {
    fill: '#78C679'
  },
  boundary: {
    fill: 'none',
    stroke: 'none'
  },
  boundaryBorder: {
    strokeWidth: '1px',
    stroke: '#FFF'
  },
  loadingText: {
    textAnchor: 'middle',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
  }
};

class Indonesia extends React.Component {

  constructor(props) {
    super(props);

    this._onMapChange = this._onMapChange.bind(this);
    this._onCategoryChange = this._onCategoryChange.bind(this);
    this.state = {
      provinces: [],
      highlighted: null,
      selected: null,
      provincesData: [],
      category: SummaryStore.getCategory()
    };

    this.coasts = null;
    this.borders = null;
    this.ranges = [];
  }

  // helper functions

  _getRangeProvinceData(provincesData) {
    let totalFees = [];
    let averageFees = [];

    provincesData.forEach((p) => {
      totalFees.push(p.get('total_fee'));
      averageFees.push((p.get('total_fee') / p.get('total_review')));
    });

    return {
      'data.totalFee': [d3.min(totalFees), d3.max(totalFees)],
      'data.averageFee': [d3.min(averageFees), d3.max(averageFees)],
      'data.averageTime': [1, 1]
    };
  }

  _getProvincesValue(provincesData, locale) {
    const { category } = this.state;

    const mappers = {
      'data.totalFee': (p) => {
        return p.get('total_fee');
      },
      'data.averageFee': (p) => {
        return (p.get('total_fee') / p.get('total_review'));
      },
      'data.averageTime': (p) => 1
    };

    const f = mappers[category];
    const values = provincesData
      .filter((p) => {
        return p.get('locale') === locale;
      })
      .map((p) => {
        return f(p);
      });

    return values[0];
  }

  _constructPath(d) {
    let { width, height, centerX, centerY, scale } = this.props;

    let projection = d3.geo.mercator()
      .center([centerX, centerY])
      .scale(scale)
      .translate([width / 2, height / 2]);
    let path = d3.geo.path().projection(projection);

    return path(d);
  }

  _getProvinces(data) {
    let provinces = topojson.feature(data, data.objects.idn_provinces).features;
    let provincePaths = provinces
      .filter((d) => {
        return d.properties.name !== null;
      })
      .map((d, idx) => {
        d.key = d.id;
        d.path = this._constructPath(d);
        return d;
      });
    return provincePaths;
  }

  _getBoundaries(data) {
    let coasts = topojson.mesh(data, data.objects.idn_provinces, function (a, b) {
      return a === b;
    });
    let borders = topojson.mesh(data, data.objects.idn_provinces, function (a, b) {
      return a !== b;
    });
    return {
      coasts: this._constructPath(coasts),
      borders: this._constructPath(borders)
    };
  }

  // map listeners

  _onCategoryChange() {
    if (this.mounted) {
      this.setState({
        category: SummaryStore.getCategory()
      });
    }
  }

  // map actions

  _highlightProvince(provinceId) {
    MapActions.highlightProvince(provinceId);
    SummaryActions.populateProvince(provinceId);
  }

  _selectProvince(provinceId) {
    let isProvinceSelected = (MapStore.selectedProvince() === provinceId);
    let province = !isProvinceSelected ? provinceId : '';

    MapActions.selectProvince(province);
    SummaryActions.populateProvince(province);
  }

  _onMapChange() {
    if (this.mounted) {
      this.setState({
        highlighted: MapStore.highlightedProvince(),
        selected: MapStore.selectedProvince()
      });
    }
  }

  // overrides

  componentDidMount() {
    fetch('/assets/indonesia.json')
      .then((response) => response.json())
      .then((json) => {
        if (this.mounted) {
          let provincePaths = this._getProvinces(json);
          let boundaries = this._getBoundaries(json);

          this.coasts = boundaries.coasts;
          this.borders = boundaries.borders;

          CommonQuery.getProvince().find()
            .then((provincesData) => {
              this.setState({
                provinces: provincePaths,
                provincesData: provincesData
              });
            });
        }
      });

    MapStore.addChangeListener(this._onMapChange);
    SummaryStore.addChangeListener(this._onCategoryChange);

    this.mounted = true;
  }

  componentWillUnmount() {
    MapStore.removeChangeListener(this._onMapChange);
    SummaryStore.removeChangeListener(this._onCategoryChange);

    this.mounted = false;
  }

  render() {
    const { width, height } = this.props;
    const { provinces, provincesData, selected, highlighted, category } = this.state;
    const { coasts, borders } = this;

    if (provinces.length === 0 || provincesData.length === 0) {
      return <div style={{ width: width }}><Loading /></div>;
    }

    const ranges = this._getRangeProvinceData(provincesData);
    const color = d3.scale.linear()
      .domain(ranges[category])
      .range(['#A1B9CB', '#253B4B']);

    let provincesPaths = provinces
      .map((province) => {

        const value = this._getProvincesValue(provincesData, province.key);
        const style = m(
          styles.province,
          {fill: color(value)},
          highlighted === province.key && styles.provinceHighlighted,
          selected === province.key && styles.provinceSelected
        );

        return (
          <path
            style={style} key={province.key}
            onMouseEnter={this._highlightProvince.bind(this, province.key)}
            onMouseLeave={this._highlightProvince.bind(this, '')}
            onClick={this._selectProvince.bind(this, province.key)}
            d={province.path}/>
        );
      });

    return (
      <svg ref='svg' width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio='xMidYMid meet'>
        {provincesPaths}
        <path className="coasts" style={styles.boundary} d={coasts}/>
        <path className="borders" style={m(styles.boundary, styles.boundaryBorder)} d={borders}/>
      </svg>
    );
  }

}

Map.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  centerX: React.PropTypes.number.isRequired,
  centerY: React.PropTypes.number.isRequired,
  scale: React.PropTypes.number.isRequired
};

export default Indonesia;
