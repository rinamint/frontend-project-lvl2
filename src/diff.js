import _ from 'lodash';
import getFiles from './parsers/parsing.js';

// eslint-disable-next-line consistent-return

export default (path1, path2) => {
  const [firstFile, secondFile] = getFiles(path1, path2);
  const keys1 = Object.keys(firstFile);
  const keys2 = Object.keys(secondFile);
  const keys = _.union(keys1, keys2);

  const diff = keys.reduce((acc, key) => {
    const before = firstFile[key];
    const after = secondFile[key];
    if (before === after) {
      acc.push([`    ${key}: ${before}`]);
    }
    if (before !== after) {
      if (after === undefined) {
        acc.push([`    -${key}: ${before}`]);
      } else {
        acc.push([`    -${key}: ${before}`]);
        acc.push([`    +${key}: ${after}`]);
      }
    }
    return acc;
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};
