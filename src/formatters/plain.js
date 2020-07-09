import { stringifyPlain } from '../stringify.js';

const innerPlain = (tree, beginning) => {
  const onlyChanged = tree.filter((element) => element.transformation !== 'unchanged');
  // eslint-disable-next-line consistent-return
  const result = onlyChanged.map((element) => {
    if (element.transformation === 'deepChange') {
      return [`${innerPlain(element.value, `${beginning}${element.name}.`)}`];
    }
    if (element.transformation === 'deleted') {
      return [`Property '${beginning}${element.name}' was removed`];
    }
    if (element.transformation === 'added') {
      return [`Property '${beginning}${element.name}' was added with value: ${stringifyPlain(element.value)}`];
    }
    if (element.transformation === 'changed') {
      return [`Property '${beginning}${element.name}' was updated. From ${stringifyPlain(element.firstValue)} to ${stringifyPlain(element.secondValue)}`];
    }
  });
  return result.flat().join('\n');
};

export default (tree) => innerPlain(tree, '');
