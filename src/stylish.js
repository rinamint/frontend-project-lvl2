/* eslint-disable array-callback-return */
const stringify = (value, indents) => {
  if (typeof (value) !== 'object') {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${key}: ${value[key]}\n`);

  return `{\n ${indents}     ${result.join('\n')}${indents}  }`;
};

const innerFormatter = (innerTree, depth) => {
  const indents = ' '.repeat(depth);
  const added = ' '.repeat(depth);
  const deleted = ' '.repeat(depth);
  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line consistent-return
  const result = innerTree.map((element) => {
    if (element.transformation === 'deepChange') {
      return [`${indents}  ${element.name}: {\n${innerFormatter(element.value, depth + 4)}\n${indents}  }`];
    }
    if (element.transformation === 'unchanged') {
      return [`${indents}  ${element.name}: ${stringify(element.value, indents)}`];
    }
    if (element.transformation === 'deleted') {
      return [`${deleted}- ${element.name}: ${stringify(element.value, indents)}`];
    }
    if (element.transformation === 'added') {
      return [`${added}+ ${element.name}: ${stringify(element.value, indents)}`];
    }
    if (element.transformation === 'changed') {
      return [`${deleted}- ${element.name}: ${stringify(element.firstValue, indents)}\n${added}+ ${element.name}: ${stringify(element.secondValue, indents)}`];
    }
  });
  return result.join('\n');
};

const form = (tree) => `{\n${innerFormatter(tree, 2)}\n}`;

export default form;
