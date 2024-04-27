export function convertKeysToCamelCase(obj) {
  const newObj = {};
  for (const key in obj) {
    newObj[pascalToCamel(key)] = obj[key];
  }
  return newObj;
}

function pascalToCamel(pascalCase) {
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
}

export function toCamel(o) {
  let newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function(value) {
      if (typeof value === "object") {
        value = toCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}