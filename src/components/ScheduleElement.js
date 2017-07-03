import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class ScheduleElement extends Component {

  elementSelect(){
    let options = this.props.activities.map(activity =>
                <option key={activity.name}
                        value={activity.name}>
                  {activity.name}
                </option>
    );
    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select"
                     placeholder="select"
                     value={this.props.event || ""}
                     onChange={(e)=> {
                       this.props.setActivity(this.props.bunk,this.props.hour,e.target.value)}
                     }>
          <option value={null}></option>
          {options}
        </FormControl>
      </FormGroup>
    );
  }

  render(){
    return (
      <td key={this.props.bunk.bunk+this.props.hour.start}>
        {this.elementSelect()}
      </td>
    );
  }
}
