import React, { Component } from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';

import Login from './components/login'
import {Nav} from './components/nav'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Route path='/login' component={Login}/>
      </div>
    );
  }
}

export default withRouter(App);
