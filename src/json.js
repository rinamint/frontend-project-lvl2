import union from 'lodash';

const getDiffForJson = (f1, f2) => {
  const file1 = JSON.parse(f1)
  const file2 = JSON.parse(f2)
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = union(keys1, keys2)

  const diff = keys.reduce((acc, key) => {
    const before = file1[key]
    const after = file2[key]
    if (before === after) {
      acc.push([`${key}`, before])
    }
    if (before !== after) {
    
    if (after === undefined) {
      acc.push([`-${key}`, before])
    }
    else {
      acc.push([`-${key}`, before])
      acc.push([`+${key}`, after])
    }
    }
 return acc  
}, [])

return diff.join("\n")
}


