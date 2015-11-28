'use strict'

import React from 'react'
import d3 from 'd3'
import topojson from 'topojson'

import { m } from '../../helper'
import MapActions from '../../actions/MapActions'
import MapStore from '../../stores/MapStore'

const styles = {
  province: {
    fill: "#B2CBDC"
  },
  provinceHighlighted: {
    fill: "#C2E699"
  },
  boundary: {
    fill: "none",
    stroke: "#BBB",
    strokeLinejoin: "round"
  },
  boundaryBorder: {
    stroke: '#FFF'
  },
  loadingText: {
    textAnchor: "middle",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
  }
}

class Map extends React.Component {

  constructor(props) {
    super(props)
    
    this._onChange = this._onChange.bind(this)
    this.state = {
      provinces: [],
      coasts: null,
      borders: null,
      highlight: null
    }
  }

  // helper functions

  _constructPath(d) {
    let { width, height, centerX, centerY, scale } = this.props

    let projection = d3.geo.mercator()
      .center([centerX, centerY])
      .scale(scale)
      .translate([width / 2, height / 2])
    let path = d3.geo.path().projection(projection)

    return path(d)
  }

  _getProvinces(data) {
    let provinces = topojson.feature(data, data.objects.idn_provinces).features
    let provincePaths = provinces
      .filter((d) => { return d.properties.name !== null })
      .map((d, idx) => {
        d.key = d.id
        d.path = this._constructPath(d)
        return d
      })
    return provincePaths
  }

  _getBoundaries(data) {
    let coasts = topojson.mesh(data, data.objects.idn_provinces, function(a, b) { return a === b })
    let borders = topojson.mesh(data, data.objects.idn_provinces, function(a, b) { return a !== b })
    return {
      coasts: this._constructPath(coasts),
      borders: this._constructPath(borders)
    }
  }

  // private functions

  _handleHover(provinceId) {
    MapActions.highlightProvince(provinceId)
  }

  _onChange() {
    this.setState({
      highlight: MapStore.highlightedProvince()
    })
  }

  // overrides

  componentDidMount() {
    fetch('/assets/indonesia.json')
      .then((response) => response.json() )
      .then((json) => {
        if (this.mounted) {
          let provincePaths = this._getProvinces(json)
          let boundaries = this._getBoundaries(json)

          this.setState({
            provinces: provincePaths,
            coasts: boundaries.coasts,
            borders: boundaries.borders
          })
        }
      })

    MapStore.addChangeListener(this._onChange)
    this.mounted = true;
  }

  componentWillMount() {
    MapStore.removeChangeListener(this._onChange)
    this.mounted = false;
  }

  render() {
    const { width, height } = this.props
    const { provinces, coasts, borders } = this.state

    if (provinces.length == 0) {
      return (
        <svg ref='svg' width={width} height={height}>
          <text x={width/2} y={height/2} style={styles.loadingText}>
            Loading...
          </text>
        </svg>
      )
    }

    let provincesPaths = provinces
      .map((province) => {
        let style = m(
          styles.province,
          MapStore.isProvinceHighlighted(province.key) && styles.provinceHighlighted
        );
        return (
          <path
            style={style} key={province.key}
            onMouseEnter={this._handleHover.bind(this, province.key)}
            onMouseLeave={this._handleHover.bind(this, '')}
            d={province.path} />
        );
      });

    let coastsPaths = (<path className="coasts" style={styles.boundary} d={coasts} />)
    let borderPaths = (<path className="borders" style={m(styles.boundary, styles.boundaryBorder)} d={borders} />)

    return (
      <svg ref='svg' width={width} height={height}>
        {provincesPaths}
        {coastsPaths}
        {borderPaths}
      </svg>
    )
  }

}

Map.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  centerX: React.PropTypes.number.isRequired,
  centerY: React.PropTypes.number.isRequired,
  scale: React.PropTypes.number.isRequired
}

export default Map
