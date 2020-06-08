import { ActionType } from '../actions/categoriesActions';

const categories = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_CATEGORIES_SUCCESS:
      return payload;
    default:
      return state;
  }
}

export default categories;
