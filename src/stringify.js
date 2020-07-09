export const stringifyPlain = (value) => {
  if (typeof (value) === 'object') {
    return '[complex value]';
  }
  if (value === true || value === false) {
    return value;
  }
  return `'${value}'`;
};

export const stringifyTree = (value, indents) => {
  if (typeof (value) !== 'object') {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${key}: ${value[key]}\n`);
  return `{\n ${indents}     ${result.join('\n')}${indents}  }`;
};
