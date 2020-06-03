import diff from '../src/diff.js';


test('testResult', () => {
  const result = [
    [ 'name: frontend-project-lvl2' ],
    [ 'version: 1.0.0' ],
    [ 'description: second-project-on-hexlet' ],
    [ 'main: index.js' ],
    [ '-type: module' ],
    [ '+type: e' ],
    [ 'author: rinamint' ],
    [ 'license: ISC' ],
    [ '-homepage: undefined' ],
    [
      '+homepage: https://github.com/rinamint/frontend-project-lvl2#readme'
    ]
  ]
 expect(diff('before.json', 'after.json')).toEqual(result.join('/n'))
});
