import _ from 'lodash';
import getFiles from './parsers/parsing.js';

// eslint-disable-next-line consistent-return

const difference = (object1, object2) => {
  const keysOfFirst = Object.keys(object1);
  const keysOfSecond = Object.keys(object2);
  const keys = _.union(keysOfFirst, keysOfSecond);
  console.log(keys)
  const transformation = {};
  const diff = keys.map((key) => {
    const first = object1[key];
    const second = object2[key];
    if (_.has(object1, key) && _.has(object2, key)) {
      if (typeof (first) === 'object' && typeof (second) === 'object') {
        transformation.name = key;
        transformation.value = difference(first, second);
        return transformation;
      }
      if (first === second) {
        transformation.name = key;
        transformation.value = first.repeat(2);
        return transformation;
      }
    }
    if (first === undefined) {
      transformation.name = key;
      transformation.value = second;
      transformation.modification = '+';
      return transformation;
    }
    if (second === undefined) {
      transformation.name = key;
      transformation.value = first;
      transformation.modification = '-';
      return transformation;
    }
  });
  return diff;
};

export default (path1, path2) => {
  const [firstObj, secondObj] = getFiles(path1, path2);
  const transition = difference(firstObj, secondObj);
  return transition;
};
