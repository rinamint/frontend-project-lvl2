import _ from 'lodash';

export const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};


export const stringifyTree = (value, indents) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, val]) => `${key}: ${val}\n`);
  return `{\n ${indents}     ${result.join('\n')}${indents}  }`;
};
