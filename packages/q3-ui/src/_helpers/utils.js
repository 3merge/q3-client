export const WILDCARD = '*';
export const INVERSION = '!';

export function intersects(a, b) {
  return a.filter((val) => b.indexOf(val) !== -1);
}

export function contains(a, b) {
  return a.findIndex((val) => val === b) !== -1;
}

export function splitByChar(str, char) {
  return Array.isArray(str)
    ? str
    : str
        .trim()
        .replace(/\s+/g, ' ')
        .split(char);
}

export function subStarts(item, char) {
  return item.startsWith(char)
    ? item.substr(1)
    : `${char}${item}`;
}

export function fn(exec, args) {
  return (props) => exec(args, props);
}

export function removeFrom(a, b) {
  return a.filter((val) => val !== b);
}

export function unique(a, b) {
  return a.filter((val) => !b.includes(val));
}

export function filterByTerm(arr, search) {
  return arr.filter((item) => {
    try {
      const re = new RegExp(search, 'gi');
      return re.test(item);
    } catch (err) {
      return false;
    }
  });
}

export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export function hasFlag(str) {
  return str.startsWith('!');
}

export function subFlags(str) {
  if (str.charAt(0) === '!') {
    return str.substr(1);
  }
  return str;
}

export function reduceByParentheses(arr) {
  return arr.reduce(
    (acc, curr) => {
      acc[curr.match(/^\((.*)\)?$/) ? 1 : 0].push(curr);
      return acc;
    },
    [[], []],
  );
}
