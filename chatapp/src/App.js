import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Chat from './components/Chat'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    )
  }
}

export default App