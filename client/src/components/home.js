import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
    <div className="home-container">
      <h1>Welcome to Casita</h1>
      <Link to={`/plants`}>meet some plants</Link>
    </div>
    )
  }
}

export default Home
