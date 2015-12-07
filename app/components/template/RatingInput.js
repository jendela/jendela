import React from 'react'
import { m } from '../../helper'
import Colors from '../../constants/JendelaColors'

const styles = {
    rating: {
        paddingTop: 0,
        color: Colors.blue
    }
}

const description = {
    1: "Sangat Jelek",
    2: "Jelek",
    3: "Normal",
    4: "Baik",
    5: "Sangat Baik"
}

class Rating extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            star: 3,
            description: ""
        }
    }

    _onClick(star) {
        this.setState({star: star})
        if (this.props.onChange)
            this.props.onChange(star)
    }

    _onMouseOver(star) {
        this.setState({description: description[star]})
    }

    _onMouseOut() {
        this.setState({description: ""})
    }

    render() {
        const { size } = this.props

        let starsSelect = [];
        for (var i = 0; i < this.state.star; i++) {
            starsSelect.push(<span key={i+1} style={m(styles.rating, { fontSize: size, cursor: "pointer" })}
                                   onClick={this._onClick.bind(this, i+1)}>{'★'}</span>)
        }

        let stars = [];
        for (var i = this.state.star; i < 5; i++) {
            stars.push(<span key={i+1} style={m(styles.rating, { fontSize: size, cursor: "pointer", color: '#E0E0E0' })}
                             onClick={this._onClick.bind(this, i+1)}>{'★'}</span>)
        }

        return (
            <span>
                {starsSelect}
                {stars}
            </span>
        )
    }
}

Rating.defaultProps = {rating: 0, size: "1.4em"};

export default Rating
