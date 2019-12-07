import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {AllPlants} from './components'

class Routes extends Component {

  render() {
    return (
  <Switch>
    <Route path="/plants" component={AllPlants}/>
  </Switch>

    )
  }
}

export default withRouter(Routes)
