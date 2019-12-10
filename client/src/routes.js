import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {AllPlants, Home, Login, Signup} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
  <Switch>
    {/*Routes available to all visitors*/}
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/plants" component={AllPlants}/>
    <Route path ="/login" component={Login} />
    <Route path="/signup" component={Signup} />

    {isLoggedIn && (
      <Switch>
        {/*Routes available for loggedin user*/}
      <Route exact path="/home" component={Home} />
      </Switch>
    )}
  </Switch>

    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))


Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
