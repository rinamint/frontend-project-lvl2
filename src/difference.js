/* eslint-disable array-callback-return */
import _ from 'lodash';

const difference = (object1, object2) => {
  const keysOfFirst = _.keys(object1).sort();
  const keysOfSecond = _.keys(object2).sort();
  const keys = _.union(keysOfFirst, keysOfSecond).sort();
  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line consistent-return
  const createDiff = keys.flatMap((key) => {
    const before = object1[key];
    const after = object2[key];
    if (before === undefined) {
      return { name: key, value: object2[key], transformation: 'added' };
    }
    if (after === undefined) {
      return { name: key, value: object1[key], transformation: 'deleted' };
    }
    if (typeof (before) === 'object' && typeof (after) === 'object') {
      return { name: key, value: difference(object1[key], object2[key]), transformation: 'deepChange' };
    }
    if (before === after) {
      return { name: key, value: object1[key], transformation: 'unchanged' };
    }
    return {
      name: key, firstValue: object1[key], secondValue: object2[key], transformation: 'changed',
    };
  });
  return createDiff;
};

export default difference;
