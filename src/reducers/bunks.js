const initialState = {
  fetched:false,
  items:[]
}

const bunks = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_BUNKS':
      return {
        ...state,
        fetched:false
      }

    case 'RECEIVE_BUNKS':
      return {
        ...state,
        fetched:true,
        items:action.bunks
      }

    case 'ADD_BUNK':
      return {
        ...state,
        items: [...state.items,action.bunk],
      };

    case 'REMOVE_BUNK':
      return {
        ...state,
        items: state.items.filter(bunk =>
          bunk.id !== action.id
        )
      };

    case 'UPDATE_BUNK':
      return {
        ...state,
        items: [state.items.map(bunk => {
          if (bunk.id !== action.bunk.id) {
            return bunk
          }
          return action.bunk;
        })]
      };

    default:
      return state;
  }
}

export default bunks