import React from 'react'

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

class JendelaInfoDetail extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <p>Jendela adalah sebuah inisiatif untuk meningkatkan transparansi pelayanan publik dan melawan praktek suap dengan cara mengajak partisipasi masyarakat untuk menyalurkan cerita pengalaman, aspirasi, kritik dan saran untuk layanan publik di seluruh Indonesia dengan cepat dan mudah.</p>

                    <div className="row">
                        <div className="small-12 medium-4 columns">
                            <h5 style={styles.points}>Menulis Ulasan</h5>

                            <p><em>Anda diminta uang suap ketika membuat KTP? Anda bertemu dengan pejabat baik di kantor kecamatan?</em></p>
                            <p>Ceritakan pengalaman Anda di jendela agar bersama-sama kita bisa meningkatkan transparansi layanan publik</p>
                        </div>
                        <div className="small-12 medium-4 columns">
                            <h5 style={styles.points}>Melihat Visualisasi Data Layanan Publik Di Indonesia</h5>

                            <p><em>Berapa rata-rata penduduk kota Solo harus mengeluarkan uang untuk membuat KTP (yang seharusnya gratis)? Di provinsi mana bisa didapati laporan uang suap paling banyak?</em></p>
                            <p>Jendela menggabungkan semua laporan masyarakat yang masuk dan menampilkannya dalam bentuk visualisasi yang apik.</p>
                        </div>
                        <div className="small-12 medium-4 columns">
                            <h5 style={styles.points}>Membaca Informasi Mengenai Layanan Publik</h5>

                            <p><em>Bagaimana prosedur pembuatan akta nikah? Berapa biaya pembuatan SIM A?</em></p>
                            <p>Informasi penting mengenai layanan publik ini juga bisa Anda dapatkan di jendela</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default JendelaInfoDetail
