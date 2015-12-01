import React from 'react'
import Maps from '../maps/Maps'
import Jendela from './Jendela'
import Review from '../review/Review'
import Services from '../Services'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Maps />
                <Jendela />
                <Review reviewType="lite" />
                <Services />
            </div>
        )
    }
}

export default Home
