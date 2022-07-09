import * as ActionTypes from './ActionTypes';

export const members = (state = { isLoading: true, errMess: null, members: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MEMBERS:
      return { ...state, isLoading: false, errMess: null, members: action.payload };
    case ActionTypes.MEMBERS_LOADING:
      return { ...state, isLoading: true, errMess: null, members: [] }
    case ActionTypes.MEMBERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};