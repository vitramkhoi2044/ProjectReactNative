import * as ActionTypes from './ActionTypes';

export const home = (state = { isLoading: true, errMess: null, home: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_HOME:
      return { ...state, isLoading: false, errMess: null, home: action.payload };
    case ActionTypes.HOME_LOADING:
      return { ...state, isLoading: true, errMess: null, home: [] }
    case ActionTypes.HOME_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};