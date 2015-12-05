'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import Loading from '../template/Loading'
import Title from '../template/Title'
import { m } from '../../helper'

import StatisticFilter from './StatisticFilter'
import Chart from './Chart'

var ParseComponent = ParseReact.Component(React);

const styles = {
    container: {
        background: "#f2faff",
        paddingTop: "20px"
    },
    title: {
        fontSize: "2em",
        fontWeight: "bold"
    },
    content: {
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    entry: {
        paddingBottom: "10px"
    }
}

class Statistic extends ParseComponent {

    constructor(props) {
        super(props);
        this.state = {
            "category": "",
            "level": ""
        };
    }

    observe(props, states) {
        return {
            items: new Parse.Query('Statistic')
        }
    }

    // Private methods and renderers

    _onChangeCategory(category) {
        this.setState({ category: category})
    }

    _onChangeLevel(level) {
        this.setState({ level: level});
    }

    render() {

        let { items } = this.data
        let { category, level } = this.state

        if (items.length == 0) {
            return (
                <div className="row">
                    <Loading />
                </div>
            )
        }

        // categories
        let categories = []
        items.forEach((e) => {
            if (categories.indexOf(e.category) == -1) {
                categories.push(e.category)
            }
        })
        if (this.state.category == "") {
            this.state.category = categories[0]
        }

        // levels
        let levels = []
        items.forEach((e) => {
            if (levels.indexOf(e.level) == -1) {
                levels.push(e.level)
            }
        })
        if (this.state.level == "") {
            this.state.level = levels[0]
        }

        // render title
        let statToShow = items.find((e) => {
            return (e.category == this.state.category && e.level == this.state.level)
        });

        const title = statToShow.title
        let data = statToShow.data
            .sort((a,b) => {
                if (a.value === undefined) {
                    return 1
                } else if (b.value === undefined) {
                    return -1
                }
                return b.value - a.value
            })

        return (
            <div>
                <section style={styles.container}>
                    <Title
                        text="Daftar Top 10 Pemerintahan Daerah"
                        iconPath="img/icon-top-ten.png"
                        color="#2d4771" />

                    <StatisticFilter
                        levels={levels}
                        categories={categories}
                        onChangingCategory={this._onChangeCategory.bind(this)}
                        onChangingLevel={this._onChangeLevel.bind(this)} />
                </section>

                <div className="row align-center">
                    <div className="small-12 columns">
                        <Chart title={title} data={data} />
                    </div>
                </div>

            </div>
        )
    }
}


Statistic.defaultProps = {type: undefined};

export default Statistic
