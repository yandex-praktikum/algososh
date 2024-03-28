export const algoritm = (string: string) => {
    const arr: string[] = [];
    for (let i = 0; i < string.length; i++) {
      arr.push(string[i])
    }
    let start = 0;
    let end = arr.length - 1;
    let array = [];
    let data = arr.slice();
    while (start < end) {
      data[start] = data.splice(end, 1, data[start])[0]
      start++;
      end--;
      array.push([...data])
    }
    array.unshift(arr)
    if (arr.length % 2 !== 0) {
      array.push(array[array.length - 1])
    }
    return array;
  }