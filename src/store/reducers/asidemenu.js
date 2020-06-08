import { ActionType } from '../actions/menuActions';

const initialUserState = {
  asideMenu: false
};

export default function asideMenu(state = { ...initialUserState }, action) {
  switch (action.type) {
    case ActionType.TOOGLE_ASIDE_MENU:
      return {
        // ...state,
        asideMenu: !state.asideMenu
      };

    default:
      return state;
  }
}
