const initialState = {
  connected: false,
  loading: false,
  token: null,
  id_user: null,
  selectedUser: {},
  user: {},
  loading: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_ID_USER':
      return {
        ...state,
        id_user: action.payload,
      };
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
