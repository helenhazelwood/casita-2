import Axios from "axios"
import history from '../history'

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
//Get a logged-in user
export const me = () => async dispatch => {
  try {
const res = await Axios.get('/auth/me')
dispatch(gotUser(res.data || defaultUser))
  } catch (error) {
console.error(error)
  }
}
//Login, signup, google oauth
export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await Axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
return dispatch(gotUser({error: authError}))
  }

  try {
    console.log('USER LOGGED IN', res.data)
    dispatch(gotUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}
//logout
export const logout = () => async dispatch => {
  try {
await Axios.post('/auth/logout')
dispatch(removedUser())
history.push('/home')
  } catch (error) {
console.error(error)
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

