import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPlants} from '../store/plants'
import PlantItem from './plantItem.js'

const NoPlants = () => {
  return (
    <div>
      <h2>There was a problem loading plants.</h2>
    </div>
  )
}

class AllPlants extends Component {
  componentDidMount() {
    this.props.getPlants()
  }

  render() {
    return (
      <div>
        {!this.props.plants.length ? (
          <NoPlants />
        ) : (
            <div className="plants-container">
              <h1>All Plants</h1>
            {this.props.plants.map(plant => (
              <PlantItem plant={plant} key={plant.id} />
            ))}
          </div>
        )}
        </div>
    )
  }
}

const mapState = state => ({
  plants: state.plants
})

const mapDispatch = dispatch => ({
  getPlants: () => dispatch(getPlants())
})

export default connect(mapState, mapDispatch)(AllPlants)
