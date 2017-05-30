import { combineReducers } from 'redux'
import bunks from './bunks'
import activities from './activities'

const todoApp = combineReducers({
  bunks,
  activities
})

export default todoApp