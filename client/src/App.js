import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/loginForm';

class App extends Component {
  render() { 
    return ( 
      <Fragment>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Fragment> );
  }
}
 
export default App;
