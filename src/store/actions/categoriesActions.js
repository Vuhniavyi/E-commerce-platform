import { getAllCategories } from "../../actions/productsActions";


export const ActionType = {
  FETCH_CATEGORIES_START: 'FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAIL: 'FETCH_CATEGORIES_FAIL',

};

export const fetchCategoriesActions = () => {
  return dispatch => {
    dispatch({
      type: ActionType.FETCH_CATEGORIES_START
    })
    getAllCategories()
      .then(c => dispatch({
        type: ActionType.FETCH_CATEGORIES_SUCCESS,
        payload: c
      })
      )
      .catch(e => dispatch({
        type: ActionType.FETCH_CATEGORIES_FAIL,
        payload: e
      }))
  }
}