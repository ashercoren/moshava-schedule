const schedules = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_SCHEDULE':
      return {
          ...state,
          items: [...state.items,action.schedule],
        };
      
    default:
      return state;
  }
};

export default schedules