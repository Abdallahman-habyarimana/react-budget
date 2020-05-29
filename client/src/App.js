import React, { Component, Fragment } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Navbar from "./components/layout/Navbar";
import Expenses from "./components/common/expenses";
import Income from "./components/common/income";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/expenses" component={Expenses} />
          <Route path="/income" component={Income} />
          <Route path="/login" component={LoginForm} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
