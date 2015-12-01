import React from 'react'
import Parse from 'parse'

import { Link } from 'react-router'

import StringConstants from '../../constants/StringConstants'

class Service extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "services": []
        }

        this.componentWillMount.bind(this);
    }

    componentWillMount() {
        new Parse.Query('Service').select(["name"]).find().then((services) => {
            this.setState({"services": services});
        });
    }

    render() {
        return (
            <section className="row">
                <div className="small-12 columns">
                    <h3>{StringConstants.SERVICE}</h3>
                </div>
                <div className="small-12 columns">
                    {this.state.services.map((service)=> {
                        return (
                            <Link to={"/services/"+service.id} className="button">{service.get("name")}</Link>
                        );
                    })}
                </div>
                <div className="small-6 medium-3 columns">
                </div>
            </section>
        );
    }
}

export default Service
