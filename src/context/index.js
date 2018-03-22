import React, { Component } from 'react';
import bunks from './bunks';
import activities from './activities';
import sessions from './sessions';
import schedules from './schedules'
import {database} from 'firebase';

const databaseRef = (entityType) => {
  return entityType+'/';
}

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class DataProvider extends Component {

  state = {
    bunks: bunks,
    activities: activities,
    sessions: sessions,
    schedules: sechdules
  }

  receiveList(data, entityType) {

  }

  requestList(entityType) {

  }

  render() {
    return (
      <MyContext.Provider value={{
        data: this.data,

        fetchList: (entityType) => {

        },

        updateEntity: () => {

        },

        growAYearOlder: () => this.setState({
          age: this.state.age + 1
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default DataProvider;