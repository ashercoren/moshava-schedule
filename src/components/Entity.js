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
      firstProperty: Object.keys(this.props.properties)[0],
      updatedEntity:this.props.entity,
      saveEnabled:false,
      editMode:false
    }
  }

  componentDidMount(){
    if (this.nameInput) this.nameInput.focus();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      updatedEntity:nextProps.entity
    })
  }

  componentDidUpdate(prevProps, prevState){
    if (!prevState.editMode && this.state.editMode) {
      if (this.nameInput) this.nameInput.focus();
    }
  }

  setEditMode(isOn){
    this.setState({
      editMode:isOn
    });
  }

  saveEntity(){
    this.props.onUpdate(this.state.updatedEntity);
    if (this.nameInput) this.nameInput.focus();
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
    let ref = (input) => { this.nameInput = input;}
    return (
      <input type="text"
             onKeyPress={(e)=>{this.onKeyPress(e)}}
             ref={(this.state.firstProperty === key) && ref}
             value={this.state.updatedEntity[key] || ""}
             placeholder={property.label}
             name={key}
             onChange={(event)=>{this.entityChange(event.target)}}>
      </input>)
  }

  numberProperty(key,property){
    let ref = (input) => { this.nameInput = input;}
    return (
      <input type="number"
             onKeyPress={(e)=>{this.onKeyPress(e)}}
             ref={(this.state.firstProperty === key) && ref}
             value={this.state.updatedEntity[key] || ""}
             placeholder={property.label}
             name={key}
             onChange={(event)=>{this.entityChange(event.target)}}>
      </input>)
  }

  selectProperty(key,property){
    let ref = (input) => { this.nameInput = input;}
    return (
      <select name={key}
              ref={(this.state.firstProperty === key) && ref}
              value={this.state.updatedEntity[key] || ""}
              onKeyPress={(event)=>{this.onKeyPress(event)}}
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

  onKeyPress(event){
    switch (event.key){
      case "Enter":
        return this.saveEntity();
      case "Escape":
        return this.setEditMode(false);
      default:
        return false;
    }
  }

  editModeRender() {
    const { properties } = this.props;
    let {saveEnabled} = this.state
    return (
      <tr>
        {Object.keys(properties).map(k=>
          <td key={k} style={{"verticalAlign": "middle"}}>
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
          <td key={k} style={{"verticalAlign": "middle"}}>{entity[k]}</td>
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