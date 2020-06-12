import fs from 'fs';
import ini from 'ini';

export default (filepath1, filepath2) => {
  const file1 = ini.decode(fs.readFileSync(filepath1, 'utf-8'));
  const file2 = ini.decode(fs.readFileSync(filepath2, 'utf-8'));
  return [file1, file2];
};
