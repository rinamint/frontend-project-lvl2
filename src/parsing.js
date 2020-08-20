
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';


const fixNums = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return fixNums(value);
  }
  if (!_.isNaN(Number(value)) && !_.isBoolean(value)) {
    return Number(value);
  }
  return value;
});


export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return fixNums(ini.parse(data));
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};
