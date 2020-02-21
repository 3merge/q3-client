import React from 'react';

export const isObject = (item) =>
  item !== null &&
  typeof item === 'object' &&
  Object.keys(item).length;

export const condense = (a) => a.flat().filter(Boolean);
export const isArray = (a) => Array.isArray(a) && a.length;

export const intersects = (a, b) =>
  condense(a).some((item) => condense(b).includes(item));

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

export const getFieldNames = (c, fieldName) =>
  React.Children.toArray(c).reduce((curr, el) => {
    const {
      type: { displayName },
      props: { children, name },
    } = el;

    if (displayName === fieldName) curr.push(name);

    if (isArray(children))
      curr.push(getFieldNames(children));

    return condense(curr);
  }, []);

export const isReady = (formikInst) =>
  formikInst && formikInst.status === 'Ready';

export const isNotInitializing = (formikInst) =>
  formikInst && formikInst.status !== 'Initializing';

export const delayPromise = (fn, args, done) =>
  setTimeout(
    () =>
      fn(args)
        .then(() => {
          if (done) done();
        })
        .catch(() => {
          // noop
        }),
    0,
  );
