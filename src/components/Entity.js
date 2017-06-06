import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import '../styles/entity.css'

export default class Entity extends Component {

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    entity: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
  }

  constructor(props){
    super(props);
    this.state={
      updatedEntity:this.props.entity,
      saveEnabled:false,
      editMode:false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      updatedEntity:nextProps.entity
    })
  }

  setEditMode(isOn){
    this.setState({
      editMode:isOn
    });
  }

  saveEntity(){
    this.props.onUpdate(this.state.updatedEntity);
    this.setState({
      updatedEntity:this.props.entity,
      saveEnabled:false,
      editMode:false
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
          <td key={k} style={{"vertical-align": "middle"}}>
            {this.inputProperty(k,properties[k])}
          </td>
        )}
        <td><Button disabled={!saveEnabled}
                    className='entity-action'
                    onClick={()=>{this.saveEntity()}}>
                    Save
            </Button>
            {this.state.editMode &&
              <Button onClick={()=>{this.setEditMode(false)}}
                      className='entity-action'>
                      Cancel
              </Button>
            }
        </td>
      </tr>
    )
  }

  nonEditRender(){
    const { onDelete, entity, properties } = this.props;
    return (
      <tr>
        {Object.keys(properties).map(k=>
          <td key={k} style={{"vertical-align": "middle"}}>{entity[k]}</td>
        )}
        <td>
          <button onClick={onDelete}
                  className='entity-action'>
            <FontAwesome name='times'/>
          </button>
          <button onClick={()=> this.setEditMode(true)}
                  className='entity-action'>
            <FontAwesome name='pencil'/>
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const { entity } = this.props;
    if (Object.keys(entity).length === 0 || this.state.editMode){
      return this.editModeRender();
    }
    return this.nonEditRender();
  }
}