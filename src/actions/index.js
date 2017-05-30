
//BUNKS
let nextBunkId = 0;

export const updateBunk = (bunk) =>{
  return {
    type: "UPDATE_BUNK",
    bunk
  }
}

export const deleteBunk = (id) => {
  return {
    type: "REMOVE_BUNK",
    id
  }
}

export const createBunk = (bunk) => {
  bunk.id = nextBunkId++;
  return {
    type: "ADD_BUNK",
    bunk
  }
}

//ACTIVITES
let nextActivityId = 0;

export const updateActivity = (activity) =>{
  return {
    type: "UPDATE_ACTIVITY",
    activity
  }
}

export const deleteActivity = (id) => {
  return {
    type: "REMOVE_ACTIVITY",
    id
  }
}

export const createActivity = (activity) => {
  activity.id = nextActivityId++;
  return {
    type: "ADD_ACTIVITY",
    activity
  }
}