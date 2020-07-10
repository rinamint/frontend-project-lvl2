import { stringifyJSON } from '../stringify.js';

const innerFormatter = (innerTree) => {
  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line consistent-return
  const result = innerTree.map((element) => {
    switch (element.transformation) {
      case 'deepChange':
        return [`${element.name}: {${innerFormatter(element.value)}}`];
      case 'unchanged':
        return [`unchanged ${element.name}: ${stringifyJSON(element.value)}`];
      case 'deleted':
        return [`deleted ${element.name}: ${stringifyJSON(element.value)}`];
      case 'added':
        return [`added ${element.name}: ${stringifyJSON(element.value)}`];
      default:
        return [`deleted ${element.name}: ${stringifyJSON(element.firstValue)} added ${element.name}: ${stringifyJSON(element.secondValue)}`];
    }
  });
  return result.join(',');
};

export default (tree) => {
  const formattedTree = innerFormatter(tree, null, 2);
  return JSON.stringify(formattedTree);
};
