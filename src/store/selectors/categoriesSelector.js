import { createSelector } from 'reselect';

export const getCategories = state => state.categories;

export const getCategoriesForCascaderComponent = createSelector([getCategories], categories => {
  const renaming = item =>
    !item.subcategories.length // функция для ренейминга входящих данных в вид, подходящий для ant.design Cascader
      ? {
        label: item.name,
        value: item.id
      }
      : {
        label: item.name,
        value: item.id,
        children: item.subcategories.map(renaming)
      };
  return categories.map(renaming);
});
