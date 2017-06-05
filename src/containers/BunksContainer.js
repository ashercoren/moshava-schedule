import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {fetchBunks, updateBunk, deleteBunk, createBunk} from '../actions';

const edahOrder = ["hey","alpha","bet","gimmel","dalet","machal"];

const sortBunks = (b1,b2) => {
  if (b1.edah !== b2.edah){
    return edahOrder.indexOf(b1.edah) - edahOrder.indexOf(b2.edah);
  }
  if (b1.gender !== b2.gender){
    return b2.gender < b1.gender;
  }
  return b2.name < b1.name;
}

const properties = {
    bunk: {
      label:"Bunk Name",
      type:"text"
    },
    edah: {
      label:"Edah",
      type:"select",
      options:edahOrder
    },
    gedner: {
      label:"Gender",
      type:"select",
      options:["boys","girls"]
    },
    numKids: {
      label: "Number Of Kids",
      type:"number"
    }
}

const entityType = "Bunks"

class BunkListContainer extends Component {

  componentDidMount() {
    const { fetchBunks, fetched } = this.props
    if (!fetched) fetchBunks();
  }

  render(){
    const {fetched, items, onCreate, onDelete, onUpdate} = this.props;
    if (fetched) {
      return (
        <EntityList entities = {items.sort(sortBunks)}
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
  const {fetched, items} = state.bunks
  return {
    fetched,items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (bunk) => {
      dispatch(updateBunk(bunk))
    },
    onDelete: (id) => {
      dispatch(deleteBunk(id))
    },
    onCreate: (bunk) => {
      dispatch(createBunk(bunk))
    },
    fetchBunks: () => {
      dispatch(fetchBunks(dispatch))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(BunkListContainer)