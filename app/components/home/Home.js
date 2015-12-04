import React from 'react'
import Maps from '../maps/Maps'
import Jendela from './JendelaCTA'
import Mobile from './GoMobile'
import Info from './JendelaInfo'
import Review from '../review/Review'
import Services from '../service/Services'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Maps />
                <Jendela />
                <Review reviewType="lite" />
                <Mobile />
                <Info />
                <Services isOnHomepage="true" />
            </div>
        )
    }
}

export default Home
