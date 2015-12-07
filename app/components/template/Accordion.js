import React from 'react'

class Accordion extends React.Component {
    constructor() {
        super()
        this.state = { active: false }
        this.styles = {
            toggler: {
                fontWeight: 700,
                color: Colors.green,
                textTransform: "uppercase"
            },
            active: {
                display: "inherit"
            },
            inactive: {
                display: "none"
            }
        }
    }

    _toggle() {
        this.setState({ active: !this.state.active })
    }

    render() {
        const activeStyle = this.state.active ? this.styles.active : this.styles.inactive
        return (
            <div>
                <a onClick={this._toggle.bind(this)}>
                    <h5 style={this.styles.toggler}>{this.props.toggler}</h5>
                </a>
                <div style={activeStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Accordion
