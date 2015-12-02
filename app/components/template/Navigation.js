import React from 'react'
import { Link } from 'react-router'
import { m } from '../../helper'

const styles = {
    dark: {
        background: "#010E25",
        color: "#9DBBD0"
    },
    logo: {
        height: '2.5em',
        widht: 'auto'
    },
    link: {
        // color: "#9DBBD0",
        textTransform: "uppercase",
        fontSize: '0.8em',
        fontWeight: 900,
        letterSpacing: '1px'
    },
    noPadding: {
        padding: 0
    },
    mobileNavbar: {
        padding: '15px',
        paddingRight: '15px',
        paddingLeft: '15px',
        paddingBottom: 0
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
                <div className="title-bar clearfix"
                    data-responsive-toggle="jendela-menu"
                    data-hide-for="large"
                    style={styles.mobileNavbar}>

                    <Link className="float-left" to="/"><img src="img/logo.png" style={styles.logo} /></Link>

                    <a className="title-bar-title float-right" style={m(styles.link, { paddingTop: '10px' })}data-toggle>Menu</a>

                </div>
                <div className="row">
                    <div className="top-bar" style={styles.dark}>
                        <div className="top-bar-left">
                            <ul className="menu vertical large-horizontal" style={styles.dark} id="jendela-menu">
                                <li className="menu-text show-for-large">
                                    <Link to="/" style={styles.noPadding}><img src="img/logo.png" style={styles.logo} /></Link>
                                </li>
                                {menus.map((menu, idx) => {
                                    let style = styles.link
                                    return <li key={idx}><Link to={menu.link} style={style}>{menu.title}</Link></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation
