import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import plants from './plants'

const reducer = combineReducers({user, plants})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

const store = createStore(reducer, middleware)

export default store