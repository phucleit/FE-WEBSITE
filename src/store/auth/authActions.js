import { SET_AUTHENTICATED } from './authTypes';

export const setAuthenticated = (isAuthenticated) => ({
  type: SET_AUTHENTICATED,
  payload: isAuthenticated
});
