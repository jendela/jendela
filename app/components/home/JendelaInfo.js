import React from 'react'
import Title from '../template/Title'
import JendelaInfoDetail from './JendelaInfoDetail'
import Youtube from '../template/Youtube'

const styles = {
    container: {
        paddingTop: "1em",
        background: "#FFF",
        marginBottom: "1em"
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
                <Youtube videoID="gg_wcLIH4RA" />
                <JendelaInfoDetail />
            </section>
        )
    }
}

export default JendelaInfo
