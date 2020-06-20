import _ from 'lodash';
import getFiles from './parsers/parsing.js';
import formatter from './stylish.js';

// eslint-disable-next-line consistent-return

const difference = (object1, object2) => {
  const keysOfFirst = _.keys(object1).sort();
  const keysOfSecond = _.keys(object2).sort();
  const keys = _.union(keysOfFirst, keysOfSecond).sort();
 

  console.log(keys);
  const diff = keys.flatMap((key) => {
    const first = object1[key];
    const second = object2[key];
    if (_.has(object1, key) && _.has(object2, key)) {
      if (typeof (first) === 'object' && typeof (second) === 'object') {
        return { name: key, value: difference(first, second) };
      }
      if (first === second) {
        return { name: key, value: first };
      }
      if (first !== second) {
        return { name: key, firstValue: first, secondValue: second, transformation: 'mutate' };
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
  return formatter(transition);
};
