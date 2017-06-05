import {database} from 'firebase';

//BUNKS
export const receiveBunks = (bunks) => {
  return {
    type:"RECEIVE_BUNKS",
    bunks
  }
}

export const requestBunks = () => {
  return {
    type:"FETCH_BUNKS"
  }
}

export const fetchBunks = () => (dispatch) => {
  dispatch(requestBunks());
  return database().ref('bunks/').once('value').then(snapshot => {
    let values = snapshot.val();
    values = values ? Object.values(values) : [];
    dispatch(receiveBunks(values));
  })
}

export const updateBunk = (bunk) => {
  let updates = {};
  updates['bunks/' + bunk.id] = bunk;
  database().ref().update(updates)
  return {
    type: "UPDATE_BUNK",
    bunk
  }
}

export const deleteBunk = (id) => {
  database().ref('bunks/'+id).remove();
  return {
    type: "REMOVE_BUNK",
    id
  }
}

export const createBunk = (bunk) => {
  let newBunkId = database().ref().child('bunks').push().key;
  let updates = {};
  bunk.id = newBunkId;
  updates['bunks/' + newBunkId] = bunk;
  database().ref().update(updates)
  return {
    type: "ADD_BUNK",
    bunk
  }
}

//ACTIVITES
export const receiveActivites = (activities) => {
  return {
    type:"RECEIVE_ACTIVITIES",
    activities
  }
}

export const requestActivities = () => {
  return {
    type:"FETCH_ACTIVITIES"
  }
}

export const fetchActivities = () => (dispatch) => {
  dispatch(requestActivities());
  return database().ref('activities/').once('value').then(snapshot => {
    let values = snapshot.val();
    values = values ? Object.values(values) : [];
    dispatch(receiveActivites(values));
  })
}

export const updateActivity = (activity) => {
  let updates = {};
  updates['activities/' + activity.id] = activity;
  database().ref().update(updates)
  return {
    type: "UPDATE_ACTIVITY",
    activity
  }
}

export const deleteActivity = (id) => {
  database().ref('activities/'+id).remove();
  return {
    type: "REMOVE_ACTIVITY",
    id
  }
}

export const createActivity = (activity) => {
  let newActivityId = database().ref().child('activities').push().key;
  let updates = {};
  activity.id = newActivityId;
  updates['activities/' + newActivityId] = activity;
  database().ref().update(updates)
  return {
    type: "ADD_ACTIVITY",
    activity
  }
}