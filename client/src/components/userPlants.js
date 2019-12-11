import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserPlants} from '../store/plants'
import PlantItem from './plantItem.js'

const NoPlants = () => {
  return (
    <div>
      <h2>You haven't added any plants yet!</h2>
    </div>
  )
}

class UserPlants extends Component {
  render() {
    console.log(this.props.user)
    return (
      <div>
        {!this.props.plants.length ? (
          <NoPlants />
        ) : (
          <div className="plants-container">
            <h1>Your Plants</h1>
            {this.props.plants.map(plant => (<PlantItem plant={plant} key={plant.id} />))}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  plants: state.user.plants,
  user: state.user
})

export default connect(mapState)(UserPlants)
