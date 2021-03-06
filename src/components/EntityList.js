import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Entity from './Entity';
  
export default class EntityList extends Component {
  
  render() {
    const {entityType,properties,entities,onUpdate,onDelete,onCreate} = this.props
    const keys = Object.keys(properties)
    const colWidth = "" + 85/keys.length + "%";
    return (
      <div>
        <h2>{entityType}</h2>
        <Table striped bordered condensed hover>
          <colgroup>
            <col span={keys.length} width={colWidth}></col>
          </colgroup>
          <thead>
            <tr>
              {keys.map(k=>
                <th key={k}>{properties[k].label}</th>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entities.map(entity =>
              <Entity
                key={entity.id}
                properties={properties}
                entity={entity}
                onUpdate={(updatedData)=> onUpdate(updatedData)}
                onDelete={() => (onDelete(entity.id))}
                />)}
            <Entity
                properties={properties}
                entity={{}}
                onUpdate={(newEntity)=> onCreate(newEntity)}/>
          </tbody>
        </Table>
      </div>
    )
  }
}

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  entityType: PropTypes.string.isRequired,
  properties: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}