import { SET_AUTHENTICATED } from './authTypes';

const initialState = {
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
