import React from 'react'
import Colors from '../../constants/JendelaColors'

class Author extends React.Component {
    render() {
        const styles = {
            container: {
                textAlign: "center",
                marginBottom: "1em"
            },
            avatar: {
                marginBottom: "1em"
            },
            name: {
                color: Colors.green,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "1em"
            },
            twitter: {
                marginTop: "0.5em",
                marginBottom: "2em"
            }
        }

        return (
            <div style={styles.container}>
                <div>
                    <img src={`img/${this.props.avatar}`} style={styles.avatar} />
                </div>
                <h5 style={styles.name}>{this.props.name}</h5>
                <div>{this.props.title}</div>
                <div>{this.props.location}</div>
                <div style={styles.twitter}>
                    <a href={`http://twitter.com/${this.props.twitter}`}>
                        <img src="img/twitter-icon.png" />
                    </a>
                </div>
            </div>
        )
    }
}

Author.defaultProps = {
    avatar: '',
    name: 'test',
    title: '',
    location: '',
    twitter: ''
}

export default Author
