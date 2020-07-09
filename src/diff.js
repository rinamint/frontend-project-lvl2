/* eslint-disable consistent-return */
import getFiles from './parsers/parsing.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import difference from './difference.js';

export default (path1, path2, format) => {
  const firstObj = getFiles(path1);
  const secondObj = getFiles(path2);
  const transition = difference(firstObj, secondObj);
  if (format === 'stylish') {
    return stylish(transition);
  }
  if (format === 'plain') {
    return plain(transition);
  }
  if (format === 'json') {
    return json(transition);
  }
};
