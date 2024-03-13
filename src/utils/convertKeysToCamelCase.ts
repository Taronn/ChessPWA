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