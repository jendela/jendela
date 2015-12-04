import React from 'react'
import Title from '../template/Title'

const styles = {
    container: {
        paddingTop: "2em",
        background: "#368baf url('img/light-texture.png')"
    },
    info: {
        color: "#FFF"
    }
}

class GoMobile extends React.Component {
    render() {
        return (
            <section style={styles.container}>
                <div className="row">
                    <div className="columns">

                        <Title
                            iconPath="img/icon-title-mobile.png"
                            text="Kirim ulasan dengan Mobile App"
                            color="#FFF" />

                        <p style={styles.info}>Jendela App akan segera diluncurkan! Mempermudah Anda untuk mendapatkan informasi tentang layanan public, menulis ulasan, dan melihat ulasan dengan cepat bahkan ketika Anda sedang berada di kantor layanan publik!</p>

                        <br />

                        <div className="row align-center">
                            <div className="small-9 columns">
                                <input type="text" placeholder="Isi alamat email Anda di sini..." />
                            </div>
                            <div className="small-9 columns">
                                <button className="button large success expanded" style={{fontWeight: "bold", marginRight:0}}>
                                    Daftarkan saya sebagai pemakai Jendela App!
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="shrink columns show-for-medium">
                        <img src="img/phone.png" />
                    </div>
                </div>
            </section>
        )
    }
}

export default GoMobile
