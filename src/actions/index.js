import {database} from 'firebase';

const databaseRef = (entityType) => {
  return entityType+'/';
}

export const receiveList = (data,entityType) => {
  return {
    type: "RECEIVE_LIST",
    entityType,
    data
  }
}

export const requestList = (entityType) => {
  return {
    type: "FETCH_LIST",
    entityType
  }
}

export const fetchList = (dispatch,entityType) => (dispatch) => {
  dispatch(requestList(entityType));
  return database().ref(databaseRef(entityType))
                   .once('value')
                   .then(snapshot => {
    let values = snapshot.val();
    values = values ? Object.values(values) : [];
    dispatch(receiveList(values,entityType));
  })
}

export const updateEntity = (entity, entityType) => {
  let updates = {};
  updates[databaseRef(entityType) + entity.id] = entity;
  database().ref().update(updates)
  return {
    type: "UPDATE_ENTITY",
    entityType,
    entity
  }
}

export const deleteEntity = (id, entityType) => {
  database().ref(databaseRef(entityType)+id).remove();
  return {
    type: "REMOVE_ENTITY",
    entityType,
    id
  }
}

export const createEntity = (entity, entityType) => {
  let newEntityId = database().ref()
                              .child(entityType)
                              .push()
                              .key;
  let updates = {};
  entity.id = newEntityId;
  updates[databaseRef(entityType) + newEntityId] = entity;
  database().ref().update(updates)
  return {
    type: "ADD_ENTITY",
    entityType,
    entity
  }
}

export const saveSchedule = (schedule) => {
  return {
    type: "ADD_ENTITY",
    entityType,
    entity
  }
}