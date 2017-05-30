import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {updateActivity, deleteActivity, createActivity} from '../actions';

const mapStateToProps = (state) => {
  return {
    entities: state.activities,
    name:"Activities",
    keys:["name","location"]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (activity) => {
      dispatch(updateActivity(activity))
    },
    onDelete: (id) => {
      dispatch(deleteActivity(id))
    },
    onCreate: (activity) => {
      dispatch(createActivity(activity))
    }
  }
}

const ActivityListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityList)

export default ActivityListContainer