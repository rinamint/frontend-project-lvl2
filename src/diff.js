import _ from 'lodash';
import getFiles from './parsers/parsing.js';

// eslint-disable-next-line consistent-return

const difference = (object1, object2) => {
  const keysOfFirst = Object.keys(object1);
  const keysOfSecond = Object.keys(object2);
  const keys = _.union(keysOfFirst, keysOfSecond);
  const diff = keys.flatMap((key) => {
    const first = object1[key];
    const second = object2[key];
    if (_.has(object1, key) && _.has(object2, key)) {
      if (typeof (first) === 'object' && typeof (second) === 'object') {
        return { name: key, value: difference(first, second) };
      }
      if (first === second) {
        return { name: key, value: first.repeat(2) };
      }
    }
    if (first === undefined) {
      return { name: key, value: second, transformation: '+' };
    }
    if (second === undefined) {
      return { name: key, value: first, transformation: '-' };
    }
  });
  return diff;
};

export default (path1, path2) => {
  const [firstObj, secondObj] = getFiles(path1, path2);
  const transition = difference(firstObj, secondObj);
  return JSON.stringify(transition);
};
