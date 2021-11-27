jest.setTimeout(30000);
jest.mock('@material-ui/core/useMediaQuery');

const { warn } = global.console;
global.console.warn = jest
  .fn()
  .mockImplementation((msg) => {
    if (!String(msg).includes('test utils are deprecated'))
      warn(msg);
  });

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
