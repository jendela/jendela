import React from 'react'
import { m } from '../../helper'
import Colors from '../../constants/JendelaColors'

const styles = {
    rating: {
        color: Colors.green
    }
}

class Rating extends React.Component {
    constructor(props) {
        super(props)
    }

    _starRating(rating) {
        if (rating <= 0) { return '' }
        return '★' + this._starRating(rating - 1)
    }

    render() {
        const { rating, size } = this.props

        return (
            <span>
                <span style={m(styles.rating, { fontSize: size })}>{this._starRating(rating)}</span>
                <span style={m(styles.rating, { fontSize: size, color: '#AAAAAA' })}>{this._starRating(5 - rating)}</span>
            </span>
        )
    }
}

Rating.defaultProps = {rating: 0, size: "1.4em"};

export default Rating
