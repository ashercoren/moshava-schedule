import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import ScheduleElement from './ScheduleElement'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datePicker.css';

const regularHours = [
  {start:"8:00",  end:"9:00"},
  {start:"9:00",  end:"10:00"},
  {start:"10:00", end:"11:00"},
  {start:"11:00", end:"12:00"},
  {start:"12:00", end:"13:00"},
  {start:"13:00", end:"14:00"},
  {start:"14:00", end:"15:00"},
  {start:"16:00", end:"16:00"},
  {start:"17:00", end:"18:00"},
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

var setActivityInSchedule = function(schedule,bunk,hour,activity){
    schedule[bunk.bunk][hour.start] = activity;
}

class DayInCamp extends Component {

  constructor(props){
    super(props);
    let defaultDate = moment();
    let hours = this.calcHours(defaultDate);
    
    this.state = {
      schedule: this.resetSchedule(hours),
      hours:hours,
      scheduleDate:defaultDate
    };
  }

  resetSchedule(hours){
    return this.props.bunks.reduce((res,bunk) => {
      res[bunk.bunk] = {}
      hours.forEach(hour => {
        setActivityInSchedule(res,bunk,hour,null);
      });
      return res;
    },{});
  }

  calcHours(date){
    switch (date.day()){
      case 5:
        return fridayHours;
      case 6:
        return shabbatHours;
      default:
        return regularHours;
    }
  }

  bunkRow(bunk){
    let items = this.state.hours.map(hour => 
      <ScheduleElement activities={this.props.activities}
                       key={bunk.bunk+hour.start}
                       setActivity={(bunk,hour,activity)=>{
                         this.setActivity(bunk,hour,activity)
                       }}
                       bunk={bunk}
                       hour={hour}
                       event={this.state.schedule[bunk.bunk][hour.start]}/>
    );

    return (
      <tr key={bunk.bunk}>
        <td>{bunk.bunk.toUpperCase()}</td>
        {items}
      </tr>
    );
  }

  hourHeader(hour){
    return (
      <td key={hour.start}>{hour.start} - {hour.end}</td>
    );
  }

  setDate(e){
    let hours = this.calcHours(e);
    let schedule = (hours === this.state.hours) ? this.state.schedule : this.resetSchedule(hours);
    this.setState({
      schedule: schedule,
      scheduleDate : e,
      hours:hours})
  }

  saveSchedule(){
    this.props.saveSchedule(this.state.schedule);
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
      <div>
        <span>Schedule for date: </span>
        <DatePicker selected={this.state.scheduleDate}
                    onChange={e => {this.setDate(e)}}
                    dateFormat="ddd, MMMM DD YYYY"/>
        <Button bsStyle="primary"
                onClick={()=>{this.saveSchedule()}}>
          Save
        </Button>
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
      </div>
    );
  }
}

export default DayInCamp;
