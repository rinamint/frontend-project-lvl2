import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import diff from '../src/diff.js';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);


const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);


const expectedStylish = fs.readFileSync(getPath('expected'), 'utf-8');
const expectedPlain = fs.readFileSync(getPath('expectedPlain'), 'utf-8');
const expectedTree = fs.readFileSync(getPath('expectedTreeTests'), 'utf-8');
const expectedPlainTree = fs.readFileSync(getPath('expectedTree'), 'utf-8');


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
});

test('INI', () => {
  const beforeINI = getPath('before.ini');
  const afterINI = getPath('after.ini');
  expect(diff(beforeINI, afterINI, 'stylish')).toEqual(expectedStylish);
  expect(diff(beforeINI, afterINI, 'plain')).toEqual(expectedPlain);
});

// npx -n --experimental-vm-modules jest
