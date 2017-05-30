import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Bunk from './Bunk';


const BunkList = ({bunks, onBunkUpdate, onBunkDelete, onBunkCreate}) => (

      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Bunk Name</th>
            <th>Edah</th>
            <th>Gender</th>
            <th>Number of Campers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bunks.map(bunk=>
            <Bunk
              key={bunk.name}
              {...bunk}
              onUpdate={(updatedBunk)=> onBunkUpdate(updatedBunk)}
              onDelete={(onBunkDelete(bunk.name))}
              />)}
        </tbody>
      </Table>
    )

BunkList.propTypes = {
  bunks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    edah: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    numKids:PropTypes.number.isRequired
  }).isRequired).isRequired,
  onBunkUpdate: PropTypes.func.isRequired,
  onBunkDelete: PropTypes.func.isRequired,
  onBunkCreate: PropTypes.func.isRequired
}

export default BunkList;