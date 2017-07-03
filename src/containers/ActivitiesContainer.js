import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {fetchList, updateEntity, deleteEntity, createEntity} from '../actions';

const dataType = "activities";
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
      dispatch(updateEntity(activity,dataType))
    },
    onDelete: (id) => {
      dispatch(deleteEntity(id,dataType))
    },
    onCreate: (activity) => {
      dispatch(createEntity(activity,dataType))
    },
    fetchActivities: () => {
      dispatch(fetchList(dispatch,dataType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ActivityListContainer)