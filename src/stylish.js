
const formatter = (obj) => {
  const lala = obj.reduce((acc, element) => {
    if (element.transformation === undefined) {
      acc.push([`    ${element.name}:${element.value}`]);
    }
    if (element.transformation === '-' ) {
      acc.push([`  - ${element.name}: ${element.value}`]);
    }
    if (element.transformation === '+') {
      acc.push([`  + ${element.name}: ${element.value}`]);
    }
    if (element.transformation === 'mutate') {
      acc.push([`  - ${element.name}: ${element.firstValue}`]);
      acc.push([`  + ${element.name}: ${element.secondValue}`]);
    }
return acc;

  }, [])
  return `{\n${lala.join('\n')}\n}`;
};

export default formatter;

const stylish = (object) => {
  if (typeof (element.value) === 'object')
}