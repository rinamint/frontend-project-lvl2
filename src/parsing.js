
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';


const transformObj = (obj) => {
  const newObj = _.mapValues(obj, (value) => {
    if (_.isObject(value)) {
      return transformObj(value);
    }
    if (_.isNaN(Number(value)) || _.isBoolean(value)) {
      return value;
    }
    return Number(value);
  });
  return newObj;
};


export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.safeLoad(file);
    case 'ini':
      return transformObj(ini.parse(file));
    default:
      throw new Error(`'Unknown format: ${format}'`);
  }
};
