export const setConnected = payload => {
  return {
    type: 'SET_CONNECTED',
    payload: payload,
  };
};

export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload: payload,
  };
};

export const setToken = payload => {
  return {
    type: 'SET_TOKEN',
    payload: payload,
  };
};

export const setIdUser = payload => {
  return {
    type: 'SET_ID_USER',
    payload: payload,
  };
};

export const setSelectedUser = payload => {
  return {
    type: 'SET_SELECTED_USER',
    payload: payload,
  };
};
