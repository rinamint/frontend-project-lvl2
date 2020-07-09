import _ from 'lodash';

const difference = (object1, object2) => {
  const keysOfFirst = _.keys(object1).sort();
  const keysOfSecond = _.keys(object2).sort();
  const keys = _.union(keysOfFirst, keysOfSecond).sort();
  // eslint-disable-next-line array-callback-return
  const createDiff = keys.flatMap((key) => {
    if (_.has(object1, key) && _.has(object2, key)) {
      if (typeof (object1[key]) === 'object' && typeof (object2[key]) === 'object') {
        return { name: key, value: difference(object1[key], object2[key]), transformation: 'deepChange' };
      }
      if (object1[key] === object2[key]) {
        return { name: key, value: object1[key], transformation: 'unchanged' };
      }
      if (object1[key] !== object2[key]) {
        return {
          name: key, firstValue: object1[key], secondValue: object2[key], transformation: 'changed',
        };
      }
    }
    if (object1[key] === undefined) {
      return { name: key, value: object2[key], transformation: 'added' };
    }
    if (object2[key] === undefined) {
      return { name: key, value: object1[key], transformation: 'deleted' };
    }
  });
  return createDiff;
};

export default difference;
