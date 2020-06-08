export default function prepareDataFromWayForPayAPI(object) {
    let string = "";
    let currentValue;
  
    for (let key in object) {
      currentValue = typeof object[key] !== "undefined" ? object[key] : "";
  
      if (Array.isArray(currentValue)) {
        currentValue.forEach(function (el) {
          string += String(el) + ";";
        });
      } else if (String(currentValue) !== "") {
        string += String(currentValue) + ";";
      }
    }
  
    return string.slice(0, -1);
  };