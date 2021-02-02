const sessionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTHUSER': {
      return {
        ...state,
        authUser: { ...action.payload, isAuth: true },
      };
    }
    case 'REMOVE_AUTHUSER': {
      return {
        ...state,
        authUser: { isAuth: false },
      };
    }
    default:
      return state;
  }
};

export default sessionReducer;
