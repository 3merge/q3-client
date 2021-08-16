import { act } from 'react-dom/test-utils';

export const asyncAct = async (fn) =>
  new Promise((resolve) => {
    let el;

    return act(async () => {
      el = await fn();
    }).then(() => {
      el.update();
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
