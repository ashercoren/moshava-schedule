const initialState = {
  fetched:false,
  items:[]
}

const activities = (state = initialState, action) => {

  switch (action.type) {

    case 'FETCH_ACTIVITIES':
      return {
        ...state,
        fetched:false
      }

    case 'RECEIVE_ACTIVITIES':
      return {
        ...state,
        fetched:true,
        items:action.activities
      }
    
    case 'ADD_ACTIVITY':
      return {
        ...state,
        items: [...state.items,action.activity],
      };

    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        items: state.items.filter(activity =>
          activity.id !== action.id
        )
      };

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        items: [state.items.map(activity => {
          if (activity.id !== action.activity.id) {
            return activity
          }
          return action.activity;
        })]
      };

    default:
      return state;
  }
}

export default activities