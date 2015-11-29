import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import Parse from 'parse'

import Navigation from './components/template/Navigation'
import Footer from './components/template/Footer'

import Home from './components/home/Home'
import Review from './components/review/Review'
import AddReview from './components/review/AddReview'
import Statistic from './components/Statistic'
import Services from './components/Services'
import FAQ from './components/FAQ'
import NotFound from './components/NotFound'

Parse.initialize("vcgh38EkiuIrke6l8pW30xokpp708lO07rR1CeqN", "LZWollLVAf5rOTziIulxhIq4atdkN4k5TaKu7BJu")

class Application extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

const router = (
    <Router>
        <Route path="/" component={Application}>
            <IndexRoute component={Home} />
            <Route path="review" component={Review} />
            <Route path="addreview" component={AddReview} />
            <Route path="statistic" component={Statistic} />
            <Route path="services" component={Services} />
            <Route path="faq" component={FAQ} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
)

render(router, document.getElementById('application'));
