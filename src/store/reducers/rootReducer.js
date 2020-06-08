import { combineReducers } from 'redux';
import user from './user';
import asideMenu from './asidemenu';
import categories from './categoriesReducer';

export default combineReducers({
  asideMenu,
  user,
  categories,
});
