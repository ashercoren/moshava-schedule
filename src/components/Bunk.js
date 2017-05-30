import React from 'react';
import PropTypes from 'prop-types';

const Bunk = ({ onUpdate, onDelete, data }) => (
  <tr>
    <td>{data.name}</td>
    <td>{data.edah}</td>
    <td>{data.gender}</td>
    <td>{data.numKids}</td>
    <td>
      <button onClick={onDelete}>X</button>
    </td>
  </tr>
)

Bunk.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default Bunk