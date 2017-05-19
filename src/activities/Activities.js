import React, { Component } from 'react';
import { Table, FormGroup, FormControl } from 'react-bootstrap';
import ActivityList from './list.js'

class Activities extends Component {

  render() {
    return (
      <Table striped bordered condensed hover>
        {/*<thead>
          <tr>
            <th></th>
            {this.state.hours.map(this.hourHeader)}
          </tr>
        </thead>
        {<tbody>
          {this.state.bunks.map(bunk => this.bunkRow(bunk))}
        </tbody>}*/}
      </Table>
    );
  }

}

export default Activities;