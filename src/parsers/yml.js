import fs from 'fs';
import yaml from 'js-yaml';


export default (filepath1, filepath2) => {
  const file1 = yaml.safeLoad(fs.readFileSync(filepath1));
  const file2 = yaml.safeLoad(fs.readFileSync(filepath2));
  return [file1, file2];
};
