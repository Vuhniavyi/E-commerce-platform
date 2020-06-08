import { ActionType } from '../actions/userActions';

const initialUserState = {
  selectedCategory: ''
};

export default function userState(state = { ...initialUserState }, action) {
  const { payload } = action;

  switch (action.type) {
    case ActionType.UPDATE_PROFILE:
      return {
        ...state,
        ...payload
      };

    case ActionType.CHANGE_CATEGORY:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
}
