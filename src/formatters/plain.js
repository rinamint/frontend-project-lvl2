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

const innerPlain = (tree, path) => {
  const onlyChanged = tree.filter((element) => element.transformation !== 'unchanged');
  const result = onlyChanged.map((element) => {
    switch (element.transformation) {
      case 'deepChange':
        return innerPlain(element.children, [...path, element.name]);
      case 'deleted':
        return `Property '${[...path, element.name].join('.')}' was removed`;
      case 'added':
        return `Property '${[...path, element.name].join('.')}' was added with value: ${stringifyPlain(element.value)}`;
      case 'changed':
        return `Property '${[...path, element.name].join('.')}' was updated. From ${stringifyPlain(element.firstValue)} to ${stringifyPlain(element.secondValue)}`;
      default:
        throw new Error(`'Unknown transformation: ${element.transformation}'`);
    }
  });
  return result.join('\n');
};

export default (tree) => innerPlain(tree, []);
