const initialState = {
  fetched:false,
  fetching:false,
  items:[]
}

const activities = (state = initialState, action) => {

  if (action.entityType === "activities"){
    switch (action.type) {

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
          items: state.items.filter(activity =>
            activity.id !== action.id
          )
        };

      case 'UPDATE_ENTITY':
        return {
          ...state,
          items: state.items.map(activity => {
            if (activity.id !== action.entity.id) {
              return activity
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

export default activities