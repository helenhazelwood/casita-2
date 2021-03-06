import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
  <Link to="/"><h1>casita</h1></Link>
  <nav>
    {isLoggedIn ? (
      <div>
        {/* Navbar links after log in */}
        <Link to="/home">home</Link>
        <Link to="/user-plants">garden</Link>
        <a href="#" onClick={handleClick}>
          logout
        </a>
      </div>
    ) : (
      <div>
        {/* Navbar links before log in */}
        <Link to="/plants">explore</Link>
        <Link to="/login">login</Link>
        <Link to="/signup">sign up</Link>
      </div>
    )}
  </nav>
</div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
