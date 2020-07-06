/* eslint-disable array-callback-return */
const stringify = (value) => {
  if (typeof (value) !== 'object') {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${key}: ${value[key]}`);
  return `{${result.join(',')}}`;
};

const innerFormatter = (innerTree) => {
  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line consistent-return
  const result = innerTree.map((element) => {
    if (element.transformation === 'deepChange') {
      return [`${element.name}: {${innerFormatter(element.value)}}`];
    }
    if (element.transformation === 'unchanged') {
      return [`${element.name}: ${stringify(element.value)}`];
    }
    if (element.transformation === 'deleted') {
      return [`deleted ${element.name}: ${stringify(element.value)}`];
    }
    if (element.transformation === 'added') {
      return [`added ${element.name}: ${stringify(element.value)}`];
    }
    if (element.transformation === 'changed') {
      return [`deleted ${element.name}: ${stringify(element.firstValue)} added ${element.name}: ${stringify(element.secondValue)}`];
    }
  });
  return result.join(',');
};

export default (tree) => {
  const formattedTree = innerFormatter(tree, 2);
  return JSON.stringify(formattedTree);
};
