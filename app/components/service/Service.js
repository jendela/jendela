import React from 'react'
import Parse from 'parse'

import { Link } from 'react-router'

import StringConstants from '../../constants/StringConstants'

const styles = {
    info: {
        background: "#9DBBD0",
        paddingTop: "25px",
        paddingBottom: "25px"
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
            <div>
                <section style={styles.info}>
                    <div className="row">
                        <div className="small-12 columns">
                            <div style={styles.title}>Layanan Publik</div>

                            <section>
                                <div className="row">
                                    <div className="large-12 columns">
                                        Berikut ini layanan publik di Indonesia
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <section style={styles.content} className="row">
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
            </div>
        );
    }
}

export default Service
