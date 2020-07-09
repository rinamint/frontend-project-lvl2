import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

// eslint-disable-next-line consistent-return
export default (pathToFile) => {
  // eslint-disable-next-line max-len
  const pathToObject = path.isAbsolute(pathToFile) ? pathToFile : path.resolve(process.cwd(), pathToFile);
  if (path.extname(pathToObject) === '.json') {
    return JSON.parse(fs.readFileSync(pathToObject));
  }
  if (path.extname(pathToObject) === '.yml') {
    return yaml.safeLoad(fs.readFileSync(pathToObject));
  }
  if (path.extname(pathToObject) === '.ini') {
    return ini.decode(fs.readFileSync(pathToObject, 'utf-8'));
  }
};
