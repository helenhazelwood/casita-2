//DUMMY DATA FOR FRONTEND BUILD
const dummyUser = {name: 'Helen', email: 'helen@email.com', password: '123', isAdmin: true}

//ACTION TYPES
const GOT_USER = 'GOT_USER'
const REMOVED_USER = 'REMOVED_USER'

//INITIAL STATE
const defaultUser = {}

//ACTION CREATORS
const gotUser = user => ({type: GOT_USER, user})
const removedUser = () => ({type: REMOVED_USER})

//THUNK CREATORS
//thunk for testing frontend
export const getUser = (email, password) => async dispatch => {
  if (dummyUser.email === email && dummyUser.password === password) {
    dispatch(gotUser(dummyUser))
  }
}

//REDUCER
export default function(state = defaultUser, action){
  switch (action.type) {
    case GOT_USER:
      return action.user
    case REMOVED_USER:
      return defaultUser
    default:
      return state
  }
}

