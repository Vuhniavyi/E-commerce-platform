 export const NUMBER = key => (a, b) => a[key] - b[key];
 export const STRING = key => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;