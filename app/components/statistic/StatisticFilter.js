import React from 'react';
import { m } from '../../helper';

const styles = {
  label: {
    marginTop: '7px'
  },
  text: {
    color: '#7385A2',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontSize: '0.9em',
    letterSpacing: '1px'
  },
  select: {
    backgroundColor: 'inherit',
    border: 'none',
    marginBottom: '1em',
    cursor: 'pointer'
  }
};

class StatisticFilter extends React.Component {

  handleCategoryChange() {
    this.props.onChangingCategory(this.refs.categorySelection.value);
  }

  handleLevelChange() {
    this.props.onChangingLevel(this.refs.levelSelection.value);
  }

  render() {
    const { levels, categories } = this.props;

    return (
      <div className="row" style={{ marginTop: '0.6em' }}>

        <div className="small-12 medium-2 large-2 columns">
          <label htmlFor="category" style={m(styles.text, styles.label)}>Kategori:</label>
        </div>

        <div className="small-12 medium-4 large-3 columns">
          <select
            id="category"
            ref="categorySelection"
            onChange={this.handleCategoryChange.bind(this)}
            style={m(styles.text, styles.select)}>

            {categories.map((category) => {
              return <option key={category} value={category}>{category}</option>;
            })}

          </select>
        </div>

        <div className="small-12 medium-2 large-2 columns">
          <label htmlFor="level" style={m(styles.text, styles.label)}>Level:</label>
        </div>

        <div className="small-12 medium-4 large-3 columns">
          <select
            id="level"
            ref="levelSelection"
            onChange={this.handleLevelChange.bind(this)}
            style={m(styles.text, styles.select)}>

            {levels.map((level) => {
              return <option key={level} value={level}>{level}</option>;
            })}

          </select>
        </div>
      </div>
    );
  }
}

StatisticFilter.defaultProps = {
  levels: [],
  categories: [],

};

export default StatisticFilter;
