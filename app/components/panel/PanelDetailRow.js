import React from 'react'
import Colors from '../../constants/JendelaColors'

const styles = {
    row: {
        borderTop: "1px solid #EEE",
        paddingTop: "2px",
        paddingBottom: "2px"
    },
    title: {
        fontWeight: 900,
        textTransform: "uppercase",
        color: "#88bcb4",
        fontSize: '0.8em'
    },
    nominal: {
        fontWeight: 900,
        color: "#8c9db8",
        fontSize: '0.9em',
        textAlign: "right"
    }
}

class PanelDetailRow extends React.Component {
    render() {
        const { key, title, nominal } = this.props

        return (
            <div className="row" key={key} style={styles.row}>
                <div className="columns" style={styles.title}>{title}</div>
                <div className="columns" style={styles.nominal}>{nominal}</div>
            </div>
        )
    }
}

PanelDetailRow.defaultProps = {
    key: '',
    title: '',
    nominal: ''
}

export default PanelDetailRow
