// [
//   {
//     "name": "common",
//     "value": [
//       {
//         "name": "follow",
//         "value": false,
//         "transformation": "added"
//       },
//       {
//         "name": "setting1",
//         "value": "Value 1",
//         "transformation": "unchanged"
//       },
//       {
//         "name": "setting2",
//         "value": 200,
//         "transformation": "deleted"
//       },
//       {
//         "name": "setting3",
//         "firstValue": true,
//         "secondValue": {
//           "key": "value"
//         },
//         "transformation": "changed"
//       },
//       {
//         "name": "setting4",
//         "value": "blah blah",
//         "transformation": "added"
//       },
//       {
//         "name": "setting5",
//         "value": {
//           "key5": "value5"
//         },
//         "transformation": "added"
//       },
//       {
//         "name": "setting6",
//         "value": [
//           {
//             "name": "key",
//             "value": "value",
//             "transformation": "unchanged"
//           },
//           {
//             "name": "ops",
//             "value": "vops",
//             "transformation": "added"
//           }
//         ],
//         "transformation": "deepChange"
//       }
//     ], // end of common
//     "transformation": "deepChange"
//   },
//   {
//     "name": "group1",
//     "value": [
//       {
//         "name": "baz",
//         "firstValue": "bas",
//         "secondValue": "bars",
//         "transformation": "changed"
//       },
//       {
//         "name": "foo",
//         "value": "bar",
//         "transformation": "unchanged"
//       },
//       {
//         "name": "nest",
//         "firstValue": {
//           "key": "value"
//         },
//         "secondValue": "str",
//         "transformation": "changed"
//       }
//     ],
//     "transformation": "deepChange"
//   },
//   {
//     "name": "group2",
//     "value": {
//       "abc": 12345
//     },
//     "transformation": "deleted"
//   },
//   {
//     "name": "group3",
//     "value": {
//       "fee": 100500
//     },
//     "transformation": "added"
//   }
// ]

//       {
//         "name": "setting3",
//         "firstValue": true,
//         "secondValue": {
//           "key": "value"
//         },
//         "transformation": "changed"
//       }

const stringify = (value, indents) => {
 if (typeof (value) !== 'object') {
    return value;
 }
  const keys = Object.keys(value);
  const result = keys.map((key) => `\n${key}: ${value[key]}`);

  return `{\n ${indents}      ${result.join('\n')}${indents}  }`;
 }

 const innerFormatter = (innerTree, depth) => {
  const indents = ' '.repeat(depth);
  const added = ' '.repeat(depth);
  const deleted = ' '.repeat(depth);
  const result = innerTree.map((element) => {
    if (element.transformation === 'deepChange') {
      return [`${indents}  ${element.name}: {\n${innerFormatter(element.value, depth + 4)}\n${indents}  }`];
    }
    if (element.transformation === 'unchanged') {
      return [`${indents}  ${element.name}: ${stringify(element.value, indents)}`];
    }
    if (element.transformation === 'deleted') {
      return [`${deleted}- ${element.name}: ${stringify(element.value, indents)}`];
    }
    if (element.transformation === 'added') {
      return [`${added}+ ${element.name}: ${stringify(element.value, indents)}`];
    }
    if (element.transformation === 'changed') {
      return [`${deleted}- ${element.name}: ${stringify(element.firstValue, indents)}\n${added}+ ${element.name}: ${stringify(element.secondValue, indents)}`];
    }
  });
  return result.join('\n');
};

const form = (tree) => {
//  if (formatter === 'tree') { 
  return `{\n${innerFormatter(tree, 2)}\n}`;
}
//  if (formatter === 'plain') {
 // return `{\n${innerFormatter(tree, 0)}\n}`;
//}
//}
//  const deep = (obj, n) => {
//  const arr = [];
//  const str = `\n${'    '.repeat(n)}`;
// arr.push(deep)
//  }
export default form;

