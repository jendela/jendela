import React from 'react'

const styles = {
    info: {
        background: "#3B655C",
        color: "#FFF",
        paddingTop: "25px",
        paddingBottom: "10px"
    }
}

class Jendela extends React.Component {
    render() {
        return (
            <section style={styles.info}>
                <div className="row">
                    <div className="large-8 columns">
                        <strong>Jendela</strong> adalah wadah Anda untuk menyalurkan aspirasi, kritik dan saran untuk layanan publik di seluruh Indonesia dengan cepat dan mudah.
                    </div>
                    <div className="large-4 columns">
                        <button type="button" className="expanded button" style={{background:'#31A694'}}>Saya mau memberi ulasan! &rarr;</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default Jendela
