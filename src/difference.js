import _ from 'lodash';

const difference = (object1, object2) => {
  const keysOfFirst = _.keys(object1);
  const keysOfSecond = _.keys(object2);
  const keys = _.union(keysOfFirst, keysOfSecond).sort();

  const createDiff = keys.flatMap((key) => {
    const before = object1[key];
    const after = object2[key];
    if (_.isUndefined(before)) {
      return { name: key, value: after, transformation: 'added' };
    }
    if (_.isUndefined(after)) {
      return { name: key, value: before, transformation: 'deleted' };
    }
    if (_.isObject(before) && _.isObject(after)) {
      return { name: key, value: difference(before, after), transformation: 'deepChange' };
    }
    if (before === after) {
      return { name: key, value: before, transformation: 'unchanged' };
    }
    return {
      name: key, firstValue: before, secondValue: after, transformation: 'changed',
    };
  });
  return createDiff;
};

export default difference;
