'use strict'

import React from 'react'
import SummaryStore from '../../stores/SummaryStore'
import MapStore from '../../stores/MapStore'
import MapActions from '../../actions/MapActions'

const styles = {
    selectionLabel: {
        color: '#7385A1',
        textTransform: 'uppercase',
        fontWeight: 900,
        fontSize: '0.9em',
        letterSpacing: '1px'
    },
    selection: {
        marginTop: '6px'
    }
}

class MapSelection extends React.Component {

    constructor(props) {
        super(props)

        this._onChange = this._onChange.bind(this)
        this.state = { selectedProvince : '' }
    }

    _selectProvince(e) {
        const provinceId = e.target.value
        MapActions.selectProvince(provinceId)
    }

    componentDidMount() {
        MapStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        MapStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState({ selectedProvince: MapStore.selectedProvince() })
    }

    render() {
        const { selectedProvince } = this.state

        return (
            <form style={styles.selection}>
                <div className="row">
                    <div className="large-1 small-4 columns">
                        <label htmlFor="map-filter" className="middle" style={styles.selectionLabel}>Filter: </label>
                    </div>
                    <div className="large-3 small-8 columns end">
                        <select id="map-filter" style={styles.selection} onChange={this._selectProvince.bind(this)} value={selectedProvince}>
                            {SummaryStore.getAllProvinces().map((province) => {
                                return <option key={province.key} value={province.key}>{province.name}</option>
                            })}
                        </select>
                    </div>
                </div>
            </form>
        )
    }
}

export default MapSelection
