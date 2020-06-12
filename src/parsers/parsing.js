import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const parseJSON = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1));
  const file2 = JSON.parse(fs.readFileSync(filepath2));
  return [file1, file2];
};
const parseYML = (filepath1, filepath2) => {
  const file1 = yaml.safeLoad(fs.readFileSync(filepath1));
  const file2 = yaml.safeLoad(fs.readFileSync(filepath2));
  return [file1, file2];
};

const parseINI = (filepath1, filepath2) => {
  const file1 = ini.decode(fs.readFileSync(filepath1, 'utf-8'));
  const file2 = ini.decode(fs.readFileSync(filepath2, 'utf-8'));
  return [file1, file2];
};

// eslint-disable-next-line consistent-return
export default (path1, path2) => {
  const pathToObject1 = path.isAbsolute(path1) ? path1 : path.resolve(process.cwd(), path1);
  const pathToObject2 = path.isAbsolute(path2) ? path2 : path.resolve(process.cwd(), path2);
  if (path.extname(pathToObject1) === '.json') {
    const [file1, file2] = parseJSON(path1, path2);
    return [file1, file2];
  }
  if (path.extname(pathToObject1) === '.yml') {
    const [file1, file2] = parseYML(path1, path2);
    return [file1, file2];
  }
  if (path.extname(pathToObject2) === '.ini') {
    const [file1, file2] = parseINI(path1, path2);
    return [file1, file2];
  }
};
