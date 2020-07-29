import getFiles from './parsers/parsing.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import difference from './difference.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};


export default (path1, path2, format) => {
  const firstObj = getFiles(path1);
  const secondObj = getFiles(path2);
  const transition = difference(firstObj, secondObj);
  return formatter(transition, format);
};
