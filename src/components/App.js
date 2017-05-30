import React, { Component } from 'react';

//COMPONENtS
//import DailyScehdule from './DailyScehdule';
import ActivityList from '../containers/ActivitiesContainer';
import BunkList from '../containers/BunksContainer';

import { Navbar } from 'react-bootstrap';
import { Link, BrowserRouter as Router , Route} from 'react-router-dom'

import '../styles/navbar.css'

class App extends Component {

  render(){
    return(
      <Router>
        <div>
          <Navbar>
            {/*<Link className="link" to="/schedule">Daily Schedule</Link>*/}
              <Link className="link" to="/activities">Manage Activities</Link>
              <Link className="link" to="/bunks">Manage Bunks</Link>
          </Navbar>
          <div className="container">
            <Route exact={true} path="/" render={()=>(
              <p>Moshava Scheduling Tool</p>
            )}/>
            {/*<Route path="/schedule/" component={DailyScehdule}/>*/}
            <Route path="/activities/" component={ActivityList}/>
            <Route path="/bunks/" component={BunkList}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;