import React from 'react'
import d3 from 'd3'
import topojson from 'topojson'

import { m } from '../../helper'
import MapActions from '../../actions/MapActions'
import SummaryActions from '../../actions/SummaryActions'
import MapStore from '../../stores/MapStore'
import Loading from '../template/Loading'

const styles = {
    province: {
        fill: "#B2CBDC",
        cursor: "pointer"
    },
    provinceHighlighted: {
        fill: "#C2E699"
    },
    provinceSelected: {
        fill: "#78C679"
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

class Indonesia extends React.Component {

    constructor(props) {
        super(props)

        this._onChange = this._onChange.bind(this)
        this.state = {
            provinces: [],
            coasts: null,
            borders: null,
            highlighted: null,
            selected: null
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

    // actions

    _highlightProvince(provinceId) {
        MapActions.highlightProvince(provinceId)
        SummaryActions.populateProvince(provinceId)
    }

    _selectProvince(provinceId) {
        let isProvinceSelected = (MapStore.selectedProvince() === provinceId)
        let province = !isProvinceSelected ? provinceId : ''

        MapActions.selectProvince(province)
        SummaryActions.populateProvince(province)
    }

    _onChange() {
        this.setState({
            highlighted: MapStore.highlightedProvince(),
            selected: MapStore.selectedProvince()
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

    componentWillUnmount() {
        MapStore.removeChangeListener(this._onChange)
        this.mounted = false;
    }

    render() {
        const { width, height } = this.props
        const { provinces, coasts, borders, selected, highlighted } = this.state

        if (provinces.length == 0) {
            return <div style={{ width: width }}><Loading /></div>
        }

        let provincesPaths = provinces
        .map((province) => {
            let style = m(
                styles.province,
                highlighted === province.key && styles.provinceHighlighted,
                selected === province.key && styles.provinceSelected
            )
            return (
                <path
                    style={style} key={province.key}
                    onMouseEnter={this._highlightProvince.bind(this, province.key)}
                    onMouseLeave={this._highlightProvince.bind(this, '')}
                    onClick={this._selectProvince.bind(this, province.key)}
                    d={province.path} />
            )
        })

        return (
            <svg ref='svg' viewBox={`0 0 ${width} ${height}`} preserveAspectRatio='xMidYMid meet'>
                {provincesPaths}
                <path className="coasts" style={styles.boundary} d={coasts} />
                <path className="borders" style={m(styles.boundary, styles.boundaryBorder)} d={borders} />
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

export default Indonesia
