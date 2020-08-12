import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';

export const readFiles = (pathToFile) => {
  switch (path.extname(pathToFile)) {
    case '.json':
      return [fs.readFileSync(pathToFile), 'json'];
    case '.yml':
      return [fs.readFileSync(pathToFile, 'utf-8'), 'yml'];
    case '.ini':
      return [fs.readFileSync(pathToFile, 'utf-8'), 'ini'];
    default:
      throw new Error(`'Wrong filepath: ${pathToFile}'`);
  }
};
const StrToNum = (object) => {
  const keys = Object.keys(object);
  const newObj = keys.reduce((acc, key) => {
    if (_.isObject(object[key])) {
      acc[key] = StrToNum(object[key]);
    }
    if (_.isNaN(Number(object[key])) || typeof (object[key]) === 'boolean') {
      acc[key] = object[key];
    } else {
      acc[key] = Number(object[key]);
    }
    return acc;
  }, {});
  return newObj;
};


export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.safeLoad(file);
    case 'ini':
      return StrToNum(ini.parse(file));
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};
