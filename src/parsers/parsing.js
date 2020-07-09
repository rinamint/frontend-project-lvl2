import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const parseJSON = (filepath1) => {
  const file = JSON.parse(fs.readFileSync(filepath1));
  //const file2 = JSON.parse(fs.readFileSync(filepath2));
  return file //file2];
};
const parseYML = (filepath1) => { 
  const file = yaml.safeLoad(fs.readFileSync(filepath1));
  //const file2 = yaml.safeLoad(fs.readFileSync(filepath2));
  return file//, file2];
};

const parseINI = (filepath1) => {
  const file = ini.decode(fs.readFileSync(filepath1, 'utf-8'));
  //const file2 = ini.decode(fs.readFileSync(filepath2, 'utf-8'));
  return file //file2];
};

// eslint-disable-next-line consistent-return
export default (path1) => {
  const pathToObject1 = path.isAbsolute(path1) ? path1 : path.resolve(process.cwd(), path1);
  //const pathToObject2 = path.isAbsolute(path2) ? path2 : path.resolve(process.cwd(), path2);
  if (path.extname(pathToObject1) === '.json') {
    const file1 = parseJSON(path1);
    return file1;
  }
  if (path.extname(pathToObject1) === '.yml') {
    const file1 = parseYML(path1);
    return file1;
  }
  if (path.extname(pathToObject1) === '.ini') {
    const file1 = parseINI(path1);
    return file1;
  }
};
