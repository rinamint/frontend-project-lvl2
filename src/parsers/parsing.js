import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

export default (pathToFile) => {
  // eslint-disable-next-line max-len
  const pathToObject = path.isAbsolute(pathToFile) ? pathToFile : path.resolve(process.cwd(), pathToFile);

  if (path.extname(pathToObject) === '.json') {
    const jsonFile = fs.readFileSync(pathToObject);
    return JSON.parse(jsonFile);
  }
  if (path.extname(pathToObject) === '.yml') {
    const ymlFile = fs.readFileSync(pathToObject, 'utf-8');
    return yaml.safeLoad(ymlFile);
  }
  if (path.extname(pathToObject) === '.ini') {
    const iniFile = fs.readFileSync(pathToObject, 'utf-8');
    return ini.decode(iniFile);
  }
  return 'ERROR';
};
