import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {fetchActivities, updateActivity, deleteActivity, createActivity} from '../actions';

class ActivityListContainer extends Component {

  componentDidMount() {
    const { fetchActivities } = this.props
    fetchActivities();
  }

  render(){
    const {fetched, items, onCreate, onDelete, onUpdate} = this.props;
    if (fetched) {
      return (
        <EntityList entities = {items}
                    name = "Activities"
                    keys = {["name","location"]}
                    onCreate = {onCreate}
                    onDelete = {onDelete}
                    onUpdate = {onUpdate}/>
      )
    }
    else {
      return (
        <p>Loading Activities</p>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const {fetched, items} = state.activities
  return {
    fetched,items
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
    },
    fetchActivities: () => {
      dispatch(fetchActivities(dispatch))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ActivityListContainer)