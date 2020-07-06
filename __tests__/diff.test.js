import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import diff from '../src/diff.js';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);


const expected = fs.readFileSync(getPath('expected'), 'utf-8')

const expectedTree = fs.readFileSync(getPath('expectedTreeTests'), 'utf-8')
const expectedPlain = fs.readFileSync(getPath('expectedTree'), 'utf-8')

test('JSON', () => {
const beforeJSON = getPath('before.json')
const afterJSON = getPath('after.json')
expect(diff(beforeJSON, afterJSON, 'stylish')).toEqual(expected);
});
test('plain nested', () => {
    const beforePlain = getPath('treeBefore.json')
    const afterPlain = getPath('treeAfter.json')
    expect(diff(beforePlain, afterPlain, 'plain')).toEqual(expectedPlain);
})
test('JSON nested', () => {
const beforeTree = getPath('treeBefore.json')
const afterTree = getPath('treeAfter.json')
expect(diff(beforeTree, afterTree, 'stylish')).toEqual(expectedTree);
});
test('YML', () => {
const beforeYML = getPath('before.yml')
const afterYML = getPath('after.yml')
expect(diff(beforeYML, afterYML, 'stylish')).toEqual(expected)
})
test('INI', () => {
const beforeINI = getPath('before.ini')
const afterINI = getPath('after.ini')
expect(diff(beforeINI, afterINI, 'stylish')).toEqual(expected)
})

// npx -n --experimental-vm-modules jest