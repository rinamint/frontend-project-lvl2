import parse, { readFiles } from './parsers/parsing.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import generateDiff from './difference.js';


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
  const [firstFile, firstFormat] = readFiles(path1);
  const [secondFile, secondFormat] = readFiles(path2);
  const transition = generateDiff(parse(firstFile, firstFormat), parse(secondFile, secondFormat));
  return formatter(transition, format);
};
