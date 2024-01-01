export const signin = (userData) => ({
  type: 'SIGNIN',
  payload: userData
});

export const logout = () => ({
  type: 'LOGOUT'
});
