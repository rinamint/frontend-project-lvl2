import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

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

export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.safeLoad(file);
    case 'ini':
      return ini.parse(file);
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};
