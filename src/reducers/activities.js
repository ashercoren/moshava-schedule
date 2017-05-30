const activities = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return [
        ...state,
        action.activity
      ];

    case 'REMOVE_ACTIVITY':
      return state.filter(activity =>
        activity.id !== action.id
      );

    case 'UPDATE_ACTIVITY':
      return state.map(activity => {
        if (activity.id !== action.activity.id) {
          return activity
        }
        return action.activity;
      });

    default:
      return state;
  }
}

export default activities