import React from 'react';
import PropTypes from 'prop-types';

const Activity = ({ onUpdate, onDelete, activity }) => (
  <tr>
    <td>{activity.name}</td>
    <td>{activity.location}</td>
    <td>
      <button onClick={onDelete}>X</button>
    </td>
  </tr>
)

Activity.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired
}

export default Activity