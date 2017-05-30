const bunks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BUNK':
      return [
        ...state,
        action.bunk
      ];

    case 'REMOVE_BUNK':
      return state.filter(bunk =>
        bunk.id !== action.id
      );

    case 'UPDATE_BUNK':
      return state.map(bunk => {
        if (bunk.id !== action.bunk.id) {
          return bunk
        }
        return action.bunk;
      });

    default:
      return state;
  }
}

export default bunks