
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';


const fixNums = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return fixNums(value);
  }
  if (!_.isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return value;
});

const parseINI = (data) => fixNums(ini.parse(data));

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseINI(data);
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};
