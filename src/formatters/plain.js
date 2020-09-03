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
    const joinedPath = [...path, element.name].join('.');
    switch (element.transformation) {
      case 'deepChange':
        return innerPlain(element.children, [...path, element.name]);
      case 'deleted':
        return `Property '${joinedPath}' was removed`;
      case 'added':
        return `Property '${joinedPath}' was added with value: ${stringifyPlain(element.value)}`;
      case 'changed':
        return `Property '${joinedPath}' was updated. From ${stringifyPlain(element.firstValue)} to ${stringifyPlain(element.secondValue)}`;
      default:
        throw new Error(`'Unknown transformation: ${element.transformation}'`);
    }
  });
  return result.join('\n');
};

export default (tree) => innerPlain(tree, []);
