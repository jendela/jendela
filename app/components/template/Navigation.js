import React from 'react'
import { Link } from 'react-router'

const styles = {
    dark: {
        background: "#010E25",
        color: "#9DBBD0"
    },
    logo: {
        height: '3.2em'
    },
    link: {
        color: "#9DBBD0",
        textTransform: "uppercase",
        fontSize: '0.8em',
        fontWeight: 900,
        letterSpacing: '1px'
    },
    noPadding: {
        padding: 0
    }

}

class Navigation extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            menus: [
                { link: '/addreview', title: 'Tulis Ulasan' },
                { link: '/review', title: 'Lihat Ulasan' },
                { link: '/statistic', title: 'Statistik Lengkap' },
                { link: '/services', title: 'Informasi Layanan Publik' },
                { link: '/faq', title: 'FAQ' },
            ]
        }
    }

    render() {
        const { menus } = this.state

        return (
            <div style={styles.dark}>
                <div className="row">
                    <nav className="top-bar" style={styles.dark}>
                        <div className="top-bar-left">
                            <ul className="dropdown menu" style={styles.dark}>
                                <li className="menu-text"><Link to="/" style={styles.noPadding}><img src="img/logo.png" style={styles.logo} /></Link></li>
                                {menus.map((menu, idx) => {
                                    return <li key={idx}><Link to={menu.link} style={styles.link}>{menu.title}</Link></li>
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navigation
