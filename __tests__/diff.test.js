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

const files = [
  ['.json'],
  ['.ini'],
  ['.yml'],
];

let expectedStylish;
let expectedPlain;
let expectedTree;
let expectedJSON;
let expectedJsonNested;

beforeAll(() => {
  expectedStylish = fs.readFileSync(getPath('expected'), 'utf-8');
  expectedPlain = fs.readFileSync(getPath('expectedPlain'), 'utf-8');
  expectedTree = fs.readFileSync(getPath('expectedTreeTests'), 'utf-8');
  expectedJSON = fs.readFileSync(getPath('expectedJSON'), 'utf-8');
  expectedJsonNested = fs.readFileSync(getPath('expectedJsonNested'), 'utf-8');
});


test.each(files)('compare two files', (file1) => {
  const before = getPath(`before${file1}`);
  const after = getPath(`after${file1}`);
  expect(generateDiff(before, after, 'stylish')).toEqual(expectedStylish);
  expect(generateDiff(before, after, 'json')).toEqual(expectedJSON);
});

test.each(files)('compare two nested files', (file1) => {
  const beforeTree = getPath(`nestedBefore${file1}`);
  const afterTree = getPath(`nestedAfter${file1}`);
  expect(generateDiff(beforeTree, afterTree, 'stylish')).toEqual(expectedTree);
  expect(generateDiff(beforeTree, afterTree, 'plain')).toEqual(expectedPlain);
  expect(generateDiff(beforeTree, afterTree, 'json')).toEqual(expectedJsonNested);
});

// npx -n --experimental-vm-modules jest
