import React from 'react'

import Title from '../template/Title'

const styles = {
    container: {
        background: "#f2faff",
        paddingTop: "25px",
        paddingBottom: "25px"
    }
}

class ServiceSummary extends React.Component {
    render() {
        return (
            <section style={styles.container}>
                <Title
                    text={this.props.title}
                    iconPath={this.props.iconPath}
                    color="#2d4771" />

                <div className="row">
                    <div className="small-12 columns">
                        <h5 style={{color: "#368baf"}}>{this.props.summary}</h5>
                    </div>
                </div>
            </section>
        )
    }
}

ServiceSummary.defaultProps = {
    title: '',
    iconPath: '',
    summary: ''
}

export default ServiceSummary
