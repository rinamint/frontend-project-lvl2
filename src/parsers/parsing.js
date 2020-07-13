import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const readFiles = (pathToFile) => {
  // eslint-disable-next-line max-len
  const pathToObject = path.isAbsolute(pathToFile) ? pathToFile : path.resolve(process.cwd(), pathToFile);
  switch (path.extname(pathToObject)) {
    case '.json':
      return [fs.readFileSync(pathToObject), 'json'];
    case '.yml':
      return [fs.readFileSync(pathToObject, 'utf-8'), 'yml'];
    case '.ini':
      return [fs.readFileSync(pathToObject, 'utf-8'), 'ini'];
    default:
      return 'ERROR';
  }
};

export default (pathToFile) => {
  const [file, format] = readFiles(pathToFile);
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.safeLoad(file);
    case 'ini':
      return ini.decode(file);
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};
