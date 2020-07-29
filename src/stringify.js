import _ from 'lodash';

export const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (value === true || value === false) {
    return value;
  }
  return `'${value}'`;
};

export const stringifyTree = (value, indents) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${key}: ${value[key]}\n`);
  return `{\n ${indents}     ${result.join('\n')}${indents}  }`;
};

