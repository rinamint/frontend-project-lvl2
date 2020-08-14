import _ from 'lodash';

const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const innerPlain = (tree, beginning) => {
  const onlyChanged = tree.filter((element) => element.transformation !== 'unchanged');
  const result = onlyChanged.map((element) => {
    switch (element.transformation) {
      case 'deepChange':
        return `${innerPlain(element.children, `${beginning}${element.name}.`)}`;
      case 'deleted':
        return `Property '${beginning}${element.name}' was removed`;
      case 'added':
        return `Property '${beginning}${element.name}' was added with value: ${stringifyPlain(element.value)}`;
      case 'changed':
        return `Property '${beginning}${element.name}' was updated. From ${stringifyPlain(element.firstValue)} to ${stringifyPlain(element.secondValue)}`;
      default:
        throw new Error(`'Unknown transformation: ${element.transformation}'`);
    }
  });
  return result.join('\n');
};

export default (tree) => innerPlain(tree, '');
