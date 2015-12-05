import React from 'react'
import Colors from '../../constants/JendelaColors'

const styles = {
    icon: {
        width: '25%',
        height: 'auto',
        paddingBottom: '4px',
        paddingTop: '4px'
    },
    info: {
        width: '75%',
        paddingLeft: 0
    },
    text: {
        color: Colors.blue,
        fontWeight: 900,
        fontSize: '1.5em',
        marginBottom: '-10px'
    },
    label: {
        color: Colors.green,
        fontWeight: 900
    }
}

class PanelInfo extends React.Component {
    render() {
        const { icon, label, text } = this.props

        return (
            <div className="row" style={styles.panel}>
                <div className="shrink columns" style={styles.icon}>
                    <img src={icon}/>
                </div>
                <div className="columns" style={styles.info}>
                    <div style={styles.text}>{text}</div>
                    <div style={styles.label}>{label}</div>
                </div>
            </div>
        )
    }
}

PanelInfo.defaultProps = { icon: '', label: '', text: '' }

export default PanelInfo
