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
  ['before.json', 'after.json'],
  ['before.ini', 'after.ini'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

let expectedStylish;
let expectedPlain;
let expectedTree;
let expectedPlainJson;
let expectedJSON;

beforeAll(() => {
  expectedStylish = fs.readFileSync(getPath('expected'), 'utf-8');
  expectedPlain = fs.readFileSync(getPath('expectedPlain'), 'utf-8');
  expectedTree = fs.readFileSync(getPath('expectedTreeTests'), 'utf-8');
  expectedJSON = fs.readFileSync(getPath('expectedJSON'), 'utf-8');
  expectedPlainJson = fs.readFileSync(getPath('expectedPlainJson'), 'utf-8');
});


test.each(files)('compare two files', (file1, file2) => {
  const before = getPath(file1);
  const after = getPath(file2);
  expect(generateDiff(before, after, 'stylish')).toEqual(expectedStylish);
  expect(generateDiff(before, after, 'plain')).toEqual(expectedPlain);
  expect(generateDiff(before, after, 'json')).toEqual(expectedJSON);
});

test('JSON nested', () => {
  const beforeTree = getPath('treeBefore.json');
  const afterTree = getPath('treeAfter.json');
  expect(generateDiff(beforeTree, afterTree, 'stylish')).toEqual(expectedTree);
  expect(generateDiff(beforeTree, afterTree, 'plain')).toEqual(expectedPlainJson);
});


// npx -n --experimental-vm-modules jest
