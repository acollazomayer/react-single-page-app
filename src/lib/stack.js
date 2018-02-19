function arrayToObject(array) {
  return array.reduce((object, current, i) => {
    return { ...object, [i]: current };
  }, {});
}

function objectToArray(object) {
  return Object.keys(object).map((key) => {
    return object[key];
  });
}

function updateStorage(array, keyName) {
  localStorage.setItem(keyName, JSON.stringify(arrayToObject(array)));
  return array;
}

export function buildPush(limit, keyName) {
  return (array, element) => {
    if (array.includes(element)) return array;
    if (array.length >= limit) {
      return updateStorage(array.slice(1, limit).concat([element]), keyName);
    }
    return updateStorage(array.concat([element]), keyName);
  };
}

export function getStoredArray(keyName) {
  if (localStorage.getItem(keyName) === null) {
    return [];
  }
  return objectToArray(JSON.parse(localStorage.getItem(keyName)));
}
