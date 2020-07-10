import { test, expect, beforeAll } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import diff from '../src/diff.js';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);


const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

let expectedStylish;
let expectedPlain;
let expectedTree;
let expectedPlainTree;
let expectedJSON;

beforeAll(() => {
  expectedStylish = fs.readFileSync(getPath('expected'), 'utf-8');
  expectedPlain = fs.readFileSync(getPath('expectedPlain'), 'utf-8');
  expectedTree = fs.readFileSync(getPath('expectedTreeTests'), 'utf-8');
  expectedPlainTree = fs.readFileSync(getPath('expectedTree'), 'utf-8');
  expectedJSON = fs.readFileSync(getPath('expectedJSON'), 'utf-8');
});

test('JSON', () => {
  const beforeJSON = getPath('before.json');
  const afterJSON = getPath('after.json');
  expect(diff(beforeJSON, afterJSON, 'stylish')).toEqual(expectedStylish);
  expect(diff(beforeJSON, afterJSON, 'plain')).toEqual(expectedPlain);
});


test('Plain nested', () => {
  const beforePlain = getPath('treeBefore.json');
  const afterPlain = getPath('treeAfter.json');
  expect(diff(beforePlain, afterPlain, 'plain')).toEqual(expectedPlainTree);
});

test('JSON nested', () => {
  const beforeTree = getPath('treeBefore.json');
  const afterTree = getPath('treeAfter.json');
  expect(diff(beforeTree, afterTree, 'stylish')).toEqual(expectedTree);
});

test('YML', () => {
  const beforeYML = getPath('before.yml');
  const afterYML = getPath('after.yml');
  expect(diff(beforeYML, afterYML, 'stylish')).toEqual(expectedStylish);
  expect(diff(beforeYML, afterYML, 'plain')).toEqual(expectedPlain);
  expect(diff(beforeYML, afterYML, 'json')).toEqual(expectedJSON);
});

test('INI', () => {
  const beforeINI = getPath('before.ini');
  const afterINI = getPath('after.ini');
  expect(diff(beforeINI, afterINI, 'stylish')).toEqual(expectedStylish);
  expect(diff(beforeINI, afterINI, 'plain')).toEqual(expectedPlain);
  expect(diff(beforeINI, afterINI, 'json')).toEqual(expectedJSON);
});

test('JSON format', () => {
  const beforeJSON = getPath('before.json');
  const afterJSON = getPath('after.json');
  expect(diff(beforeJSON, afterJSON, 'json')).toEqual(expectedJSON);
});

// npx -n --experimental-vm-modules jest
