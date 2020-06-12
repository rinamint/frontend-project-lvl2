import _ from 'lodash';
import path from 'path';
import parseYaml from './parsers/yml.js';
import parseJson from './parsers/json.js';

// eslint-disable-next-line consistent-return
const files = (path1, path2) => {
  const pathToObject1 = path.isAbsolute(path1) ? path1 : path.resolve(process.cwd(), path1);
  const pathToObject2 = path.isAbsolute(path2) ? path2 : path.resolve(process.cwd(), path2);
  if (path.extname(pathToObject1) === '.json') {
    const [file1, file2] = parseJson(path1, path2);
    return [file1, file2];
  }
  if (path.extname(pathToObject2) === '.yml') {
    const [file1, file2] = parseYaml(path1, path2);
    return [file1, file2];
  }
};

export default (path1, path2) => {
  const [firstFile, secondFile] = files(path1, path2);
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
