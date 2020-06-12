import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import diff from '../src/diff.js';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);
test('testResult', () => {
  const expected = [
    '    name: frontend-project-lvl2',
    '    version: 1.0.0',
    '    description: second-project-on-hexlet',
    '    main: index.js',
    '    -type: module',
    '    +type: e',
    '    author: rinamint',
    '    license: ISC',
    '    -homepage: undefined',
    '    +homepage: https://github.com/rinamint/frontend-project-lvl2#readme',
    ]

  const beforeJSON = getPath('before.json')
  const afterJSON = getPath('after.json')
  const beforeYML = getPath('before.yml')
  const afterYml = getPath('after.yml')
  expect(diff(beforeJSON, afterJSON)).toEqual(`{\n${expected.join('\n')}\n}`);
  expect(diff(beforeYML, afterYml)).toEqual(`{\n${expected.join('\n')}\n}`)
});
