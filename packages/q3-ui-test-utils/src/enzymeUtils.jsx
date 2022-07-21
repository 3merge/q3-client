import { act } from 'react-dom/test-utils';

export const asyncAct = async (fn) =>
  new Promise((resolve, reject) => {
    let el;

    act(async () => {
      try {
        el = await fn();
      } catch (e) {
        reject(e);
      }
    }).then(() => {
      if (el) el.update();
      resolve(el);
    });
  });

export const asyncMount = async (Component) =>
  new Promise((resolve) => {
    let el;

    act(async () => {
      el = global.mount(Component);
    }).then(() => {
      el.update();
      resolve(el);
    });
  });

export const containerSpec = (container) => ({
  has: (el) =>
    expect(container.find(el).exists()).toBeTruthy(),

  toBeEmpty: () =>
    expect(container.isEmptyRender()).toBeTruthy(),
});

export const wait = (interval = 0) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });

export const exists = (el) =>
  expect(el.exists()).toBeTruthy();

export const doesNotExist = (el) =>
  expect(el.exists()).toBeFalsy();

export const hasSomeOf = (el) =>
  expect(el.length).toBeGreaterThan(0);

export const hasNoneOf = (el) => expect(el.length).toBe(0);
