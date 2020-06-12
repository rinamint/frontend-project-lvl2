import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import diff from '../src/diff.js';

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
  '    +homepage: https://github.com/rinamint/frontend-project-lvl2',
  ]

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);
test('JSON', () => {
  const beforeJSON = getPath('before.json')
  const afterJSON = getPath('after.json')
  expect(diff(beforeJSON, afterJSON)).toEqual(`{\n${expected.join('\n')}\n}`);
});
test('YML', () => {
  const beforeYML = getPath('before.yml')
  const afterYML = getPath('after.yml')
  expect(diff(beforeYML, afterYML)).toEqual(`{\n${expected.join('\n')}\n}`)
})
test('INI', () => {
  const beforeINI = getPath('before.ini')
  const afterINI = getPath('after.ini')
  expect(diff(beforeINI, afterINI)).toEqual(`{\n${expected.join('\n')}\n}`)
})
