import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DayInCamp from './DayInCamp';
import { Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './index.css';

class Body extends Component {
  constructor(props){
    super(props);
    this.state = {
      route:"schedule"
    }
  }

  handleSelect(){

  }

  getPage(){
    switch (this.state.route){
      case "schedule":
        return (<DayInCamp date={new Date()} />);
      default:
        return (<DayInCamp date={new Date()} />);
    }
  }

  render(){
    return(
      <Router>
        <Sidebar>
          <SidebarItem>
            <Link to={"schedule"}>
              Daily schedule
            </Link>
            </SidebarItem>
            <SidebarItem>
            <Link to="activities">
              Activities
            </Link>
          </SidebarItem>
        </Sidebar>
        <div>
          {this.getPage()}
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <Body />,
  document.getElementById('root')
);
