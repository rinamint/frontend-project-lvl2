
const formatter = (obj) => {
  const lala = obj.reduce((acc, element) => {
  //    const str = `\n${'    '.repeat(n)}`;

    if (element.transformation === 'deepChange') {
    //      acc.push([`${str}${formatter(element.value)}`]);
    }
    if (element.transformation === 'unchanged') {
      acc.push([`    ${element.name}: ${element.value}`]);
    }
    if (element.transformation === 'deleted') {
      acc.push([`  - ${element.name}: ${element.value}`]);
    }
    if (element.transformation === 'added') {
      acc.push([`  + ${element.name}: ${element.value}`]);
    }
    if (element.transformation === 'changed') {
      acc.push([`  - ${element.name}: ${element.firstValue}`]);
      acc.push([`  + ${element.name}: ${element.secondValue}`]);
    }

    return acc;
  }, []);
  return `{\n${lala.join('\n')}\n}`;
};
//  const deep = (obj, n) => {
//  const arr = [];
//  const str = `\n${'    '.repeat(n)}`;
// arr.push(deep)
//  }
export default formatter;
