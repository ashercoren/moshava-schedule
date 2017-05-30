import React, { Component } from 'react';
import { Table, FormGroup, FormControl } from 'react-bootstrap';

const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Shabbat"];
const regularHours = [
  {start:"8:00",  end:"9:00"},
  {start:"9:00",  end:"10:00"},
  {start:"10:00", end:"11:00"},
  {start:"11:00", end:"12:00"},
  {start:"12:00", end:"13:00"},
];
const fridayHours = [
  {start:"8:00",  end:"9:00"},
  {start:"9:00",  end:"10:00"},
  {start:"10:00", end:"11:00"},
  {start:"11:00", end:"12:00"},
  {start:"12:00", end:"13:00"},
];
const shabbatHours = [
  {start:"8:00",  end:"9:00"},
  {start:"9:00",  end:"10:00"},
  {start:"10:00", end:"11:00"},
  {start:"11:00", end:"12:00"},
  {start:"12:00", end:"13:00"},
];

class ScheduleElement extends Component {

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

  elementButton(){
    return (
      <button onClick={()=> this.props.setActivity(this.props.bunk,this.props.hour,5)}>
        Click Me
      </button>
    );
  }

  render(){
    return (
      <td key={this.props.bunk.name+this.props.hour.start}>
        {this.elementSelect()}
      </td>
    );
  }
}

var setActivityInSchedule = function(schedule,bunk,hour,activity){
    schedule[bunk.name][hour.start] = activity;
}

class DayInCamp extends Component {

  constructor(props){
    super(props);
    let dayOfWeek = null;//props.date.getDay();
    let hours;
    switch (dayOfWeek){
      case 5:
        hours = fridayHours;
        break;
      case 6:
        hours = shabbatHours;
        break;
      default:
        hours = regularHours;
    }
    let schedule = props.bunks.reduce((res,bunk) => {
      res[bunk.name] = {}
      hours.forEach(hour => {
        setActivityInSchedule(res,bunk,hour,null);
      });
      return res;
    },{});

    this.state = {
      schedule: schedule,
      dayOfWeek:dayNames[dayOfWeek],
      hours:hours
    };
  }

  bunkRow(bunk){
    let items = this.state.hours.map(hour => 
      <ScheduleElement activities={this.props.activities}
                       key={bunk.name+hour.start}
                       setActivity={(bunk,hour,activity)=>{
                         this.setActivity(bunk,hour,activity)
                       }}
                       bunk={bunk}
                       hour={hour}
                       event={this.state.schedule[bunk.name][hour.start]}/>
    );

    return (
      <tr key={bunk.name}>
        <td>{bunk.name.toUpperCase()}</td>
        {items}
      </tr>
    );
  }

  hourHeader(hour){
    return (
      <td key={hour.start}>{hour.start} - {hour.end}</td>
    );
  }

  setActivity(bunk,hour,activity){
    let schedule = {};
    Object.assign(schedule,this.state.schedule);
    setActivityInSchedule(schedule,bunk,hour,activity);
    this.setState({
      schedule:schedule
    });
  }

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Bunk</th>
            {this.state.hours.map(this.hourHeader)}
          </tr>
        </thead>
        {<tbody>
          {this.props.bunks.map(bunk => this.bunkRow(bunk))}
        </tbody>}
      </Table>
    );
  }
}

export default DayInCamp;
