import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default (path1, path2) => {
  const pathToObject1 = path.isAbsolute(path1) ? path1 : path.resolve(process.cwd(), path1);
  const pathToObject2 = path.isAbsolute(path2) ? path2 : path.resolve(process.cwd(), path2);
  const file1 = JSON.parse(fs.readFileSync(pathToObject1));
  const file2 = JSON.parse(fs.readFileSync(pathToObject2));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);

  const diff = keys.reduce((acc, key) => {
    const before = file1[key];
    const after = file2[key];
    if (before === after) {
      acc.push([`${key}: ${before}`]);
    }
    if (before !== after) {
      if (after === undefined) {
        acc.push([`-${key}: ${before}`]);
      } else {
        acc.push([`-${key}: ${before}`]);
        acc.push([`+${key}: ${after}`]);
      }
    }
    return acc;
  }, []);

  return diff.join('\n');
};
