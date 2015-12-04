import React from 'react'
import { Link } from 'react-router'

const styles = {
    info: {
        background: "#3b655d",
        color: "#FFF",
        paddingTop: "1rem",
        marginBottom: "1em"
    }
}

class JendelaCTA extends React.Component {
    render() {
        return (
            <section style={styles.info} className="show-for-large">
                <div className="row">
                    <div className="shrink columns">
                        <img src="img/icon-cta-question.png" />
                    </div>
                    <div className="columns" style={{ paddingBottom: "1rem" }}>
                        <strong>Jendela</strong> adalah wadah Anda untuk menyalurkan aspirasi, kritik dan saran untuk layanan publik di seluruh Indonesia dengan cepat dan mudah.
                    </div>
                    <div className="shrink columns">
                        <Link to="/addreview" className="expanded button success">
                            <img src="/img/icon-pen.png" style={{ marginRight: '1em' }} />
                            <strong>Saya mau memberi ulasan!</strong>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default JendelaCTA
