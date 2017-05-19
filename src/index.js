import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DayInCamp from './schedule/Schedule';
import Activities from './activities/Activities';
import { BrowserRouter as Router , Link, Route} from 'react-router-dom'
import './index.css';

class Body extends Component {

  handleSelect(){

  }

  render(){
    return(
      <Router>
        <div>
          <Link to="/schedule">Schedule</Link>
          <Link to="/activities">Manage Activities</Link>
          <Route exact={true} path="/" render={()=>(
            <p>Moshava Scheduling Tool</p>
          )}/>
          <Route path="/schedule/" component={DayInCamp}/>
          <Route path="/activities/" component={Activities}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <Body />,
  document.getElementById('root')
);
