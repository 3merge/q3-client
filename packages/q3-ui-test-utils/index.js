/* eslint-disable import/no-extraneous-dependencies, no-console */
jest.mock('@material-ui/core/useMediaQuery');

const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const {
  createMount,
  createShallow,
  createRender,
} = require('@material-ui/core/test-utils');

const oldLocation = global.window.location;
delete global.window.location;

global.window.ResizeObserver = require('./src/resizeObserverMock');

global.window.location = {
  ...oldLocation,
};

enzyme.configure({
  adapter: new Adapter(),
});

global.mount = createMount();
global.render = createRender();
global.shallow = createShallow();

global.console = {
  warn: jest.fn(), // console.warn are ignored in tests
  error: console.error,
  log: console.log,
  info: console.info,
  debug: console.debug,
};
