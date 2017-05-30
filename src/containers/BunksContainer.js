import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import {updateBunk, deleteBunk, createBunk} from '../actions';

const edahOrder = ["hey","alpha","bet","gimmel","dalet","machal"];

const sortBunks = (b1,b2) => {
  if (b1.edah !== b2.edah){
    return edahOrder.indexOf(b2.edah) - edahOrder.indexOf(b1.edah);
  }
  if (b1.gender !== b2.gender){
    return b2.gender < b1.gender;
  }
  return b2.name < b1.name;
}

const mapStateToProps = (state) => {
  return {
    entities: state.bunks.sort(sortBunks),
    name:"Bunks",
    keys:["Edah","Gedner","Number Of Kids"]
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
    }
  }
}

const BunkListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityList)

export default BunkListContainer