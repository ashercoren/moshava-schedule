import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {fetchActivities, updateActivity, deleteActivity, createActivity} from '../actions';

const properties = {
  name: {
    type:"text",
    label:"Name"
  },
  location: {
    type:"text",
    label:"Location"
  }
}

const entityType = "Activities"


class ActivityListContainer extends Component {

  componentDidMount() {
    const { fetchActivities, fetched } = this.props
    if (!fetched) fetchActivities();
  }

  render(){
    const {fetched, items, onCreate, onDelete, onUpdate} = this.props;
    if (fetched) {
      return (
        <EntityList entities = {items}
                    entityType = {entityType}
                    properties = {properties} 
                    onCreate = {onCreate}
                    onDelete = {onDelete}
                    onUpdate = {onUpdate}/>
      )
    }
    else {
      return (
        <p>Loading {entityType}</p>
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