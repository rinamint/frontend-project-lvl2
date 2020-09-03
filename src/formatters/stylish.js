import _ from 'lodash';


const indents = (depth) => '  '.repeat(depth);

const stringifyTree = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, val]) => `${indents(depth + 2)}    ${key}: ${val}`);
  return `{\n${result.join('\n')}\n${indents(depth + 2)}}`;
};

const innerFormatter = (innerTree, depth) => {
  const result = innerTree.map((element) => {
    switch (element.transformation) {
      case 'deepChange':
        return `${indents(depth)}    ${element.name}: ${innerFormatter(element.children, depth + 2)}`;
      case 'unchanged':
        return `${indents(depth)}    ${element.name}: ${stringifyTree(element.value, depth)}`;
      case 'deleted':
        return `${indents(depth)}  - ${element.name}: ${stringifyTree(element.value, depth)}`;
      case 'added':
        return `${indents(depth)}  + ${element.name}: ${stringifyTree(element.value, depth)}`;
      case 'changed':
        return [`${indents(depth)}  - ${element.name}: ${stringifyTree(element.firstValue, depth)}`,
          `${indents(depth)}  + ${element.name}: ${stringifyTree(element.secondValue, depth)}`].join('\n');
      default:
        throw new Error(`'Unknown transformation: ${element.transformation}'`);
    }
  });
  return `{\n${result.join('\n')}\n${indents(depth)}}`;
};

const form = (tree) => innerFormatter(tree, 0);

export default form;
