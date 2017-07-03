const initialState = {
  fetched:false,
  fetching:false,
  currentSession:null,
  items:[]
}

const sessions = (state = initialState, action) => {

  if (action.entityType === "sessions"){    
  
    switch (action.type) {

      case 'SELECT_ENTITY':
        return {
          ...state,
          currentSession: action.entity
        }

      case 'FETCH_LIST':
        return {
          ...state,
          fetching:true
        }

      case 'RECEIVE_LIST':
        return {
          ...state,
          fetched:true,
          fetching:false,
          items:action.data
        }
      
      case 'ADD_ENTITY':
        return {
          ...state,
          items: [...state.items,action.entity],
        };

      case 'REMOVE_ENTITY':
        return {
          ...state,
          items: state.items.filter(session =>
            session.id !== action.id
          )
        };

      case 'UPDATE_ENTITY':
        return {
          ...state,
          items: state.items.map(session => {
            if (session.id !== action.entity.id) {
              return session
            }
            return action.entity;
          })
        };

      default:
        return state;
    }
  }
  else {
    return state;
  }
}

export default sessions