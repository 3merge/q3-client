export const isObject = (item) =>
  typeof item === 'object' && Object.keys(item).length;

export const isArray = (a) => Array.isArray(a) && a.length;

export const asOptions = (a) =>
  isArray(a)
    ? a.map((value) => ({
        label: value,
        value,
      }))
    : [];

export const assignIDs = (a, prop) =>
  a.map((item, i) => {
    if (!isObject(item)) return item;
    if (prop) return { ...item, id: item[prop] };
    if (!item.id) return { ...item, id: i };
    return item;
  });
