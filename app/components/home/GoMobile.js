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

                            <form action="//jende.us1.list-manage.com/subscribe/post?u=3a2c29fca637e81baaa0aef9f&amp;id=c424e8d863"
                                method="post"
                                id="mc-embedded-subscribe-form"
                                name="mc-embedded-subscribe-form"
                                className="validate"
                                target="_blank"
                                novalidate >

                                <div className="small-12 medium-9 columns">
                                    <input type="email" placeholder="Isi alamat email Anda di sini..." value="" name="EMAIL" class="required email" id="mce-EMAIL" />
                                </div>

                                <div className="small-12 medium-9 columns">
                                    <input
                                        type="submit"
                                        value={ "Daftarkan saya sebagai pemakai Jendela App!" }
                                        name="subscribe"
                                        id="mc-embedded-subscribe"
                                        className="button large success expanded"
                                        style={{fontWeight: "bold", marginRight:0}} />
                                </div>

                                <div id="mce-responses" class="clear">
                            		<div className="response" id="mce-error-response" style={{display:"none"}}></div>
                            		<div className="response" id="mce-success-response" style={{display:"none"}}></div>
                            	</div>

                                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_3a2c29fca637e81baaa0aef9f_c424e8d863" tabindex="-1" value=""></div>

                            </form>

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
