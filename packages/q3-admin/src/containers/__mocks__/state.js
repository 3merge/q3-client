export const Definitions = {
  Provider: jest
    .fn()
    .mockImplementation(({ children }) => children),
};

export const Dispatcher = {
  Provider: jest
    .fn()
    .mockImplementation(({ children }) => children),
};

export const Store = {
  Provider: jest
    .fn()
    .mockImplementation(({ children }) => children),
};
