import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {fetchList, updateEntity, deleteEntity, createEntity} from '../actions';

const dataType = "bunks";
const edahOrder = ["Kaitana","Hey","Alpeh","Bet","Gimmel","Dalet","Machal"];

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
      dispatch(updateEntity(bunk,dataType))
    },
    onDelete: (id) => {
      dispatch(deleteEntity(id,dataType))
    },
    onCreate: (bunk) => {
      dispatch(createEntity(bunk,dataType))
    },
    fetchBunks: () => {
      dispatch(fetchList(dispatch,dataType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(BunkListContainer)