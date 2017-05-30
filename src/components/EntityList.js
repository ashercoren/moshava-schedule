import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import Entity from './Entity';


export default class EntityList extends Component {
  
  static propTypes = {
    entities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    keys: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state={
      newEntity:{},
      newEnabled:false
    }
  }

  saveEntity(){
    this.props.onCreate(this.state.newEntity);
    this.setState({
      newEntity:{},
      newEnabled:false
    })
  }

  newEntityValid(newEntity){
    this.props.keys.forEach(k=>{
      if (!newEntity[k] || newEntity[k].length===0) return false;
    })
    return true;
  }

  handleInputChange(target){
    let newEntity = {}
    Object.assign(newEntity,this.state.newEntity);
    newEntity[target.name] = target.value;
    let newEnabled = this.newEntityValid(newEntity);
    this.setState({
      newEntity:newEntity,
      newEnabled:newEnabled
    })
  }

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              {this.props.keys.map(k=>
                <th key={k}>{k}</th>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.entities.map(entity =>
              <Entity
                key={entity.id}
                keys={this.props.keys}
                entity={entity}
                onUpdate={(updatedData)=> this.props.onUpdate(updatedData)}
                onDelete={() => (this.props.onDelete(entity.id))}
                />)}
            <tr>
              {this.props.keys.map(k=>
                <td key={k}>
                  <input type="text"
                         value={this.state.newEntity[k] || ""}
                         placeholder={k}
                         name={k}
                         onChange={(event)=>{this.handleInputChange(event.target)}}>
                  </input>
                </td>
              )}
              <td><Button disabled={!this.state.newEnabled}
                          onClick={()=>{this.saveEntity()}}>
                          Save
                  </Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
