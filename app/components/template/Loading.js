import React from 'react'

class Loading extends React.Component {
    render() {
        const style = {
            display: "block",
            marginTop: "2em",
            marginBottom: "2em",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center"
        }

        return <img src="img/loading.gif" style={style} />
    }
}

export default Loading
