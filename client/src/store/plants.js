//DUMMY DATA FOR FRONTEND BUILD
import dummyPlants from '../dummyData'

//DEFAULT STATE
const defaultPlants = {}
//ACTION TYPES
const GOT_PLANTS = 'GOT_PLANTS'

//ACTION CREATORS
const gotPlants = plants => ({type: GOT_PLANTS, plants})

//THUNK CREATORS
//written with dummy plants for frontend build
export const getPlants = async dispatch => {
  const data = dummyPlants
  dispatch(gotPlants(data))
}

//REDUCER
export default function(state = defaultPlants, action) {
  switch(action.type) {
    case GOT_PLANTS:
      return [state, ...action.plants]
    default:
      return state
  }
}
