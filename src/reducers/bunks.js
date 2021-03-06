const initialState = {
  fetched:false,
  fetching:false,
  items:[]
}

const bunks = (state = initialState, action) => {
  if (action.entityType === "bunks"){
    switch (action.type) {

      case 'FETCH_LIST':
        return {
          ...state,
          fetching: true
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
          items: state.items.filter(bunk =>
            bunk.id !== action.id
          )
        };

      case 'UPDATE_ENTITY':
        return {
          ...state,
          items: state.items.map(bunk => {
            if (bunk.id !== action.entity.id) {
              return bunk
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

export default bunks