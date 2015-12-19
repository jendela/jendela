import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import Parse from 'parse';

import styles from '../styles/app.scss';

import Navigation from './components/template/Navigation';
import Footer from './components/template/Footer';

import Home from './components/home/Home';
import Review from './components/review/Review';
import ReviewAdd from './components/review/ReviewAdd';
import Statistic from './components/statistic/Statistic';
import Services from './components/service/Services';
import ServicesDetail from './components/service/ServiceDetail';
import About from './components/about/About';
import NotFound from './components/NotFound';

Parse.initialize(PARSE_APP_ID, PARSE_KEY);

class Application extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const router = (
  <Router>
    <Route path="/" component={Application}>
      <IndexRoute component={Home}/>
      <Route path="review/:provinceId" component={Review}/>
      <Route path="review" component={Review}/>
      <Route path="addreview/:provinceId" component={ReviewAdd}/>
      <Route path="addreview" component={ReviewAdd}/>
      <Route path="statistic" component={Statistic}/>
      <Route path="services/:serviceId" component={ServicesDetail}/>
      <Route path="services" component={Services}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

render(router, document.getElementById('application'));
