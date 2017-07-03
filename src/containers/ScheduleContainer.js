import React, { Component } from 'react';
import { connect } from 'react-redux';

import {fetchList, saveSchedule} from '../actions';
import DayInCamp from '../components/DailySchedule';

class ScheduleContainer extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render(){
    const {dataFetched, saveSchedule, data} = this.props;
    const {bunks,activities,schedules,sessions} = data;

    if (dataFetched) {
      return (
        <DayInCamp bunks={bunks}
                   activities={activities}
                   schedules={schedules}
                   sessions={sessions}
                   saveSchedule={saveSchedule}/>
      )
    }
    else {
      return (
        <p>Loading Data</p>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dataFetched: state.activities.fetched &&
                 state.bunks.fetched &&
                 state.sessions.fetched,
    data: {
      activities: state.activities.items,
      bunks: state.bunks.items,
      sessions: state.sessions
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchList(dispatch,"bunks"));
      dispatch(fetchList(dispatch,"activities"));
      dispatch(fetchList(dispatch,"sessions"));
    },
    saveSchedule: (schedule) => {
      dispatch(saveSchedule(schedule));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ScheduleContainer)