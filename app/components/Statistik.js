'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

var ParseComponent = ParseReact.Component(React);

class Statistik extends ParseComponent {

    constructor(props) {
        super(props);
        this.state = {
            "kategori": "",
            "level": ""
        };
    }

    observe(props, states) {
        return {
            items: new Parse.Query('Statistik')
        };
    }


    render() {

        if (this.data.items.length == 0)
            return <span>Loading</span>;

        // config filter
        let kategoris = [];
        this.data.items.forEach((e)=> {
            if (kategoris.indexOf(e.kategori) == -1)
                kategoris.push(e.kategori);
        });
        if (this.state.kategori == "")
            this.state.kategori = kategoris[0];
        let levels = [];
        this.data.items.forEach((e)=> {
            if (levels.indexOf(e.level) == -1)
                levels.push(e.level);
        });
        if (this.state.level == "")
            this.state.level = levels[0];

        // render filter
        let filter = (
            <form>
                <div>
                    <label htmlFor="kategori">Kategori</label>
                    <select id="kategori" onChange={this._onChangeKategori.bind(this)}>
                        {kategoris.map((kategori) => {
                            return <option key={kategori}
                                           value={kategori}>{kategori}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="level">Level</label>
                    <select id="level" onChange={this._onChangeLevel.bind(this)}>
                        {levels.map((level) => {
                            return <option key={level}
                                           value={level}>{level}</option>
                        })}
                    </select>
                </div>
            </form>
        );

        // render title
        let statToShow = this.data.items.find((e) => {
            if (e.kategori == this.state.kategori && e.level == this.state.level)
                return true;
            return false;
        });

        // render statistik
        let tableToShow = statToShow.data.map((e) => {
            return (
                <div className="row" key={e.name}>
                    <div className="small-12 large-6 columns">{e.name}</div>
                    <div className="small-12 large-6 columns">{e.nilai==undefined?0:e.nilai}</div>
                </div>
            )
        });

        // return
        return (
            <div>
                {filter}
                <h4>{statToShow.judul}</h4>
                <div className="panel">{tableToShow}</div>
            </div>
        )
    }

    _onChangeKategori(e) {
        this.setState({"kategori": e.target.value});
    }

    _onChangeLevel(e) {
        this.setState({"level": e.target.value});
    }

}
Statistik.defaultProps = {type: undefined};
export default Statistik
