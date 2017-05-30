import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import Activity from './Activity';


export default class ActivityList extends Component {
  
  static propTypes = {
    activities: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onActivityUpdate: PropTypes.func.isRequired,
    onActivityDelete: PropTypes.func.isRequired,
    onActivityCreate: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state={
      newActivity:{},
      newEnabled:false
    }
  }

  saveActivity(){
    this.props.onActivityCreate(this.state.newActivity);
    this.setState({
      newActivity:{},
      newEnabled:false
    })
  }

  newActivityValid(newActivity){
    return newActivity.name && newActivity.name.length > 0 &&
           newActivity.location && newActivity.location.length > 0;
  }

  handleInputChange(target){
    let newActivity = {}
    Object.assign(newActivity,this.state.newActivity);
    newActivity[target.name] = target.value;
    let newEnabled = this.newActivityValid(newActivity);
    this.setState({
      newActivity:newActivity,
      newEnabled:newEnabled
    })
  }

  render() {
    return (
      <div>
        <h2>Activities</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.activities.map(activity=>
              <Activity
                key={activity.id}
                activity={activity}
                onUpdate={(updatedData)=> this.props.onActivityDUpdate(updatedData)}
                onDelete={() => (this.props.onActivityDelete(activity.id))}
                />)}
            <tr>
              <td><input type="text"
                         value={this.state.newActivity.name || ""}
                         placeholder="name"
                         name="name"
                         onChange={(event)=>{this.handleInputChange(event.target)}}>
                  </input></td>
              <td><input type="text"
                         value={this.state.newActivity.location|| ""}
                         placeholder="location"
                         name="location"
                         onChange={(event)=>{this.handleInputChange(event.target)}}>
                  </input></td>
              <td><Button disabled={!this.state.newEnabled}
                          onClick={()=>{this.saveActivity()}}>
                          Save
                  </Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
