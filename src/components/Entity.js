import React from 'react';
import PropTypes from 'prop-types';

const Entity = ({ onUpdate, onDelete, entity, keys }) => (
  <tr>
    {keys.map(k=>
      <td key={k}>{entity[k]}</td>
    )}
    <td>
      <button onClick={onDelete}>X</button>
    </td>
  </tr>
)

Entity.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  keys: PropTypes.array.isRequired
}

export default Entity