import React from 'react'
import Title from '../template/Title'

const styles = {
    container: {
        paddingTop: "1em",
        background: "#FFF",
        marginBottom: "1em"
    },
    points: {
        color: "#368baf",
        fontWeight: "700"
    }
}

class JendelaInfo extends React.Component {
    render() {
        return (
            <section style={styles.container}>
                <Title
                    iconPath="img/icon-jendela-info.png"
                    text="Apa fungsi Jendela?"
                    color="#2d4771" />

                <div className="row">
                    <div className="columns">
                        <p>Jendela adalah sebuah inisiatif untuk meningkatkan transparansi pelayanan publik dan melawan praktek suap dengan cara mengajak partisipasi masyarakat untuk menyalurkan cerita pengalaman, aspirasi, kritik dan saran untuk layanan publik di seluruh Indonesia dengan cepat dan mudah.</p>

                        <div className="row">
                            <div className="small-12 medium-4 columns">
                                <h5 style={styles.points}>Menulis Ulasan</h5>

                                <p>Anda diminta uang suap ketika membuat KTP? Anda bertemu dengan pejabat baik di kantor kecamatan? Ceritakan pengalaman Anda di jendela agar bersama-sama kita bisa meningkatkan transparansi layanan publik</p>
                            </div>
                            <div className="small-12 medium-4 columns">
                                <h5 style={styles.points}>Melihat Visualisasi Data Layanan Publik Di Indonesia</h5>

                                <p>Berapa rata-rata penduduk kota Solo harus mengeluarkan uang untuk membuat KTP (yang seharusnya gratis)? Di provinsi mana bisa didapati laporan uang suap paling banyak? Jendela menggabungkan semua laporan masyarakat yang masuk dan menampilkannya dalam bentuk visualisasi yang apik.</p>
                            </div>
                            <div className="small-12 medium-4 columns">
                                <h5 style={styles.points}>Membaca Informasi Mengenai Layanan Publik</h5>

                                <p>Bagaimana prosedur pembuatan akta nikah? Berapa biaya pembuatan SIM A? Informasi penting mengenai layanan publik ini juga bisa Anda dapatkan di jendela</p>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        )
    }
}

export default JendelaInfo
