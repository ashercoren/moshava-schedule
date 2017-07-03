import { combineReducers } from 'redux';
import bunks from './bunks';
import activities from './activities';
import sessions from './sessions';
import schedules from './schedules'

const todoApp = combineReducers({
  bunks,
  activities,
  sessions,
  schedules
})

export default todoApp