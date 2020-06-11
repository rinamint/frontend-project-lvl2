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

  const before = getPath('before.json')
  const after = getPath('after.json')
  expect(diff(before, after)).toEqual(`{\n${expected.join('\n')}\n}`);
});
