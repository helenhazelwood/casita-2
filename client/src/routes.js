import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {AllPlants, Home} from './components'

class Routes extends Component {

  render() {
    return (
  <Switch>
    <Route path="/plants" component={AllPlants}/>
    <Route exact path="/" component={Home} />
  </Switch>

    )
  }
}

export default withRouter(Routes)
