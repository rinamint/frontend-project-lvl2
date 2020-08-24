import path from 'path';
import fs from 'fs';
import parse from './parsing.js';
import formatter from './formatters/formatter.js';
import generateDiff from './difference.js';

const getFormat = (pathToFile) => path.extname(pathToFile).slice(1);

const getData = (pathToFile) => {
  const reading = fs.readFileSync(pathToFile, 'utf-8');
  const format = getFormat(pathToFile);
  return parse(reading, format);
};


export default (path1, path2, format) => {
  const firstFile = getData(path1);
  const secondFile = getData(path2);
  const diff = generateDiff(firstFile, secondFile);
  return formatter(diff, format);
};
