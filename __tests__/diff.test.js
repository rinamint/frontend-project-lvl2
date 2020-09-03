import { test, expect, beforeAll } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import generateDiff from '../src/index.js';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);


const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const extnames = [
  ['.json'],
  ['.ini'],
  ['.yml'],
];

let expectedPlain;
let expectedTree;
let expectedJsonNested;

beforeAll(() => {
  expectedPlain = fs.readFileSync(getPath('expectedPlain'), 'utf-8');
  expectedTree = fs.readFileSync(getPath('expectedTreeTests'), 'utf-8');
  expectedJsonNested = fs.readFileSync(getPath('expectedJsonNested'), 'utf-8');
});


test.each(extnames)(('compare two files (input ext: %s)'), (file1) => {
  const beforeTree = getPath(`nestedBefore${file1}`);
  const afterTree = getPath(`nestedAfter${file1}`);
  expect(generateDiff(beforeTree, afterTree, 'plain')).toEqual(expectedPlain);
  expect(generateDiff(beforeTree, afterTree, 'stylish')).toEqual(expectedTree);
  expect(generateDiff(beforeTree, afterTree, 'json')).toEqual(expectedJsonNested);
});

// npx -n --experimental-vm-modules jest
