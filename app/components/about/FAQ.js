import React from 'react'
import Title from '../template/Title'
import Colors from '../../constants/JendelaColors'

class Accordion extends React.Component {
    constructor() {
        super()
        this.state = { active: false }
        this.styles = {
            toggler: {
                fontWeight: 700,
                color: Colors.green,
                textTransform: "uppercase"
            },
            active: {
                display: "inherit"
            },
            inactive: {
                display: "none"
            }
        }
    }

    _toggle() {
        this.setState({ active: !this.state.active })
    }

    render() {
        const activeStyle = this.state.active ? this.styles.active : this.styles.inactive
        return (
            <div>
                <a onClick={this._toggle.bind(this)}>
                    <h5 style={this.styles.toggler}>{this.props.toggler}</h5>
                </a>
                <div style={activeStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class FAQ extends React.Component {
    constructor() {
        super()

        this.QA = [
            {
                question: "Apa fungsi utama Jendela?",
                answer: (
                    <div>
                        <p>1. Menulis Ulasan</p>
                        <p>Anda diminta uang suap ketika membuat KTP? Anda bertemu dengan pejabat baik di kantor kecamatan? Ceritakan pengalaman Anda di jendela agar bersama-sama kita bisa meningkatkan transparansi layanan publik</p>
                        <p>2. Melihat Visualisasi Data Layanan Publik Di Indonesia</p>
                        <p>Berapa rata-rata penduduk kota Solo harus mengeluarkan uang untuk membuat KTP (yang seharusnya gratis)? Di provinsi mana bisa didapati laporan uang suap paling banyak? Jendela menggabungkan semua laporan masyarakat yang masuk dan menampilkannya dalam bentuk visualisasi yang apik.</p>
                        <p>3. Membaca Informasi Mengenai Layanan Publik</p>
                        <p>Bagaimana prosedur pembuatan akta nikah? Berapa biaya pembuatan SIM A? Informasi penting mengenai layanan public ini juga bisa Anda dapatkan di jendela</p>
                    </div>
                )
            },
            {
                question: "Mengapa saya harus menulis ulasan?",
                answer: (<p>Pengalaman Anda baik itu pengalaman buruk (diminta uang suap, proses pembuatan lama dan berbelit-belit, dll) atau pengalaman baik bisa digunakan sebagai referensi bagi masyarakat lain dan juga mendorong instansi layanan publik terkait untuk membuat perubahan ke arah yang lebih baik.</p>)
            },
            {
                question: "Apakah kritik dan saran saya akan dibaca?",
                answer: (<p>Kami akan berusaha untuk meneruskan ulasan, kritik, dan saran Anda pada medium lain yang bersangkutan.</p>)
            },
            {
                question: "Kenapa saya harus melaporkan jika saya membayar uang suap?",
                answer: (<p>Dengan melaporkan di portal ini berarti Anda sudah membantu untuk melawan praktek koruptif ini. Kami berharap dengan adanya kumpulan data dari masyarakat kami bisa membawa data ini kepada para kepala daerah atau pejabat publik terkait untuk membuat perubahan.</p>)
            },
            {
                question: "Apakah ulasan yang ditampilkan di portal ini selalu akurat?",
                answer: (<p>Tidak. Namun kami memoderasi setiap ulasan yang masuk sebelum menampilkannya di portal kami. Sejumlah matriks kami gunakan untuk menilai keakuratan ulasan mereka.</p>)
            },
            {
                question: "Darimana inspirasi Anda untuk membuat portal ini?",
                answer: (<p>Kami mendapatkan inspirasi dari portal sejenis bernama Ipaidabribe yang sukses membuat perubahan di India.</p>)
            }
        ]

    }

    render() {
        const styles = {
            container: {
                marginTop: "1em",
                marginBottom: "1em"
            },
            questions: {
                fontWeight: 700,
                color: Colors.green,
                textTransform: "uppercase"
            }
        }

        return (
            <div className="row" style={styles.container}>
                <div className="small-12 columns">
                    <Title
                        iconPath="img/icon-faq.png"
                        text="FAQs"
                        color="#2d4771" />

                    {this.QA.map((e, idx) => {
                        return <Accordion toggler={e.question} key={idx}>{e.answer}</Accordion>
                    })}

                </div>
            </div>
        )
    }
}

export default FAQ
