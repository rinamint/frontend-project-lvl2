import _ from 'lodash';

const stringifyTree = (value, indents) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${key}: ${value[key]}\n`);
  return `{\n ${indents}     ${result.join('\n')}${indents}  }`;
};

const innerFormatter = (innerTree, depth) => {
  const indents = ' '.repeat(depth);
  const result = innerTree.map((element) => {
    switch (element.transformation) {
      case 'deepChange':
        return `${indents}  ${element.name}: {\n${innerFormatter(element.children, depth + 4)}\n${indents}  }`;
      case 'unchanged':
        return `${indents}  ${element.name}: ${stringifyTree(element.value, indents)}`;
      case 'deleted':
        return `${indents}- ${element.name}: ${stringifyTree(element.value, indents)}`;
      case 'added':
        return `${indents}+ ${element.name}: ${stringifyTree(element.value, indents)}`;
      case 'changed':
        return `${indents}- ${element.name}: ${stringifyTree(element.firstValue, indents)}\n${indents}+ ${element.name}: ${stringifyTree(element.secondValue, indents)}`;
      default:
        throw new Error(`'Unknown transformation: ${element.transformation}'`);
    }
  });
  return result.join('\n');
};

const form = (tree) => `{\n${innerFormatter(tree, 2)}\n}`;

export default form;
