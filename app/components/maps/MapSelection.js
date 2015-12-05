import React from 'react'
import SummaryStore from '../../stores/SummaryStore'
import MapStore from '../../stores/MapStore'
import MapActions from '../../actions/MapActions'
import SummaryActions from '../../actions/SummaryActions'
import { m } from '../../helper'

const styles = {
    label: {
        color: '#7385A1',
        textTransform: 'uppercase',
        fontWeight: 900,
        fontSize: '0.9em',
        letterSpacing: '1px'
    },
    selection: {
        marginTop: '6px',
        paddingLeft: '10px',
        paddingRight: '30px',
        marginBottom: "8px",
        border: "none",
        backgroundColor: "inherit",
        backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"32\" height=\"24\" viewBox=\"0 0 32 24\"><polygon points=\"0,0 32,0 16,24\" style=\"fill: rgb(115, 133, 161)\"></polygon></svg>')",
        backgroundSize: "9px 6px",
        backgroundPosition: "right 0.5rem center",
        backgroundRepeat: "no-repeat"
    }
}

class MapSelection extends React.Component {

    constructor(props) {
        super(props)

        this._onChange = this._onChange.bind(this)
        this.state = {
            selectedProvince: '',
            selectedCategory: 'data.averageFee'
        }
    }

    _selectProvince(e) {
        const provinceId = e.target.value
        MapActions.selectProvince(provinceId)
        SummaryActions.populateProvince(provinceId)
    }

    _selectCategory(e) {
        const category = e.target.value
        SummaryActions.setCategory(category)
    }

    componentDidMount() {
        MapStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        MapStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState({
            selectedProvince: MapStore.selectedProvince(),
            selectedCategory: SummaryStore.getCategory()
        })
    }

    render() {
        const { selectedProvince } = this.state
        const { selectedCategory } = this.state

        return (
            <form>
                <div className="row">
                    <div className="shrink columns">
                        <label htmlFor="filter-map" style={m(styles.label, { marginTop: "13px" })}>Filter: </label>
                    </div>
                    <div className="shrink columns">
                        <select id="filter-map"
                            style={m(styles.selection, styles.label)}
                            onChange={this._selectProvince.bind(this)}
                            value={selectedProvince}>
                            {SummaryStore.getAllProvinces().map((province) => {
                                return <option key={province.key} value={province.key}>{province.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="shrink columns">
                        <select id="filter-summary"
                            style={m(styles.selection, styles.label)}
                            onChange={this._selectCategory.bind(this)}
                            value={selectedCategory}>
                            <option key="show.averageFee" value="data.averageFee">Rata-rata biaya</option>
                            <option key="show.totalFee" value="data.totalFee">Total biaya</option>
                            <option key="show.averageTime" value="data.averageTime">Rata-rata waktu</option>
                        </select>
                    </div>
                </div>
            </form>
        )
    }
}

export default MapSelection
