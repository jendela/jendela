import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Colors from '../../constants/JendelaColors'

const styles = {
    pagination: {
        background: Colors.green,
        color: "#FFF"
    }
}

class ReviewPagination extends React.Component {
    render() {

        const { page, showNext } = this.props

        let prev = <li className="pagination-previous disabled">Sebelum</li>;
        if (page != 0) {
            prev = <li className="pagination-previous"><a href="#" onClick={this._onPrevClicked.bind(this)}>Sebelum</a></li>
        }

        let next = <li className="pagination-next disabled">Setelah</li>;
        if (showNext) {
            next = <li className="pagination-next"><a href="#" onClick={this._onNextClicked.bind(this)}>Setelah</a></li>
        }

        return (
            <div className="row">
                <div className="small-12 columns">
                    <ul className="pagination text-center">
                        {prev}

                        <li className="current" style={styles.pagination}>
                            <span className="show-for-sr">Anda di halaman</span>
                            { page + 1 }
                        </li>

                        {next}
                    </ul>
                </div>
            </div>

        );
    }

    _onPrevClicked(e) {
        this.props.updatePage(this.props.page - 1);
    }

    _onNextClicked(e) {
        this.props.updatePage(this.props.page + 1);
    }
}

ReviewPagination.defaultProps = {
    page: 0,
    showNext: false
}

export default ReviewPagination
