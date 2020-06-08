export const onFilter = {
    indexOf: key => (value, record) => record[key].indexOf(value) === 0,
};