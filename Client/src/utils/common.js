export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const getToken = () => sessionStorage.getItem('token') || null;

export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};
