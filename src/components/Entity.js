import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Entity extends Component {

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    entity: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
    editMode: PropTypes.bool
  }

  constructor(props){
    super(props);
    this.state={
      updatedEntity:this.props.entity,
      saveEnabled:false
    }
  }

  saveEntity(){
    this.props.onUpdate(this.state.updatedEntity);
    this.setState({
      updatedEntity:this.props.entity,
      saveEnabled:false
    });
  }

  entityValid(entity){
    return Object.keys(this.props.properties).every(k=>{
      return (entity[k] && entity[k].length > 0)
    })
  }

  entityDirty(entity){
    return Object.keys(this.props.properties).some(k=>{
      return entity[k] !== this.props.entity[k]
    })
  }

  entityChange(target){
    let entity = {}
    Object.assign(entity,this.state.updatedEntity);
    entity[target.name] = target.value;
    let saveEnabled = this.entityValid(entity) && this.entityDirty(entity);
    this.setState({
      updatedEntity:entity,
      saveEnabled:saveEnabled
    })
  }

  textProperty(key,property){
    return (
      <input type="text"
             value={this.state.updatedEntity[key] || ""}
             placeholder={property.label}
             name={key}
             onChange={(event)=>{this.entityChange(event.target)}}>
      </input>)
  }

  numberProperty(key,property){
    return (
      <input type="number"
             value={this.state.updatedEntity[key] || ""}
             placeholder={property.label}
             name={key}
             onChange={(event)=>{this.entityChange(event.target)}}>
      </input>)
  }

  selectProperty(key,property){
    return (
      <select name={key}
              value={this.state.updatedEntity[key] || ""}
              onChange={(event)=>{this.entityChange(event.target)}}>
        <option value=""></option>
        {property.options.map(option =>
          <option key={option}
                  value={option}>
            {option}
          </option>
        )}
      </select>
    )
  }

  inputProperty(key,property){
    switch(property.type){
      case "number":
        return this.numberProperty(key,property);

      case "select":
        return this.selectProperty(key,property);

      case "text":
      default:
        return this.textProperty(key,property);
    }
  }

  editModeRender() {
    const { properties } = this.props;
    let {saveEnabled} = this.state
    return (
      <tr>
        {Object.keys(properties).map(k=>
          <td key={k}>
            {this.inputProperty(k,properties[k])}
          </td>
        )}
        <td><Button disabled={!saveEnabled}
                    onClick={()=>{this.saveEntity()}}>
                    Save
            </Button>
        </td>
      </tr>
    )
  }

  nonEditRender(){
    const { onDelete, entity, properties } = this.props;
    return (
      <tr>
        {Object.keys(properties).map(k=>
          <td key={k}>{entity[k]}</td>
        )}
        <td>
          <button onClick={onDelete}>X</button>
        </td>
      </tr>
    )
  }

  render() {
    const { editMode } = this.props;
    if (editMode){
      return this.editModeRender();
    }
    return this.nonEditRender();
  }
}