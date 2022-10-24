jest.setTimeout(30000);

jest.mock('@material-ui/core/useMediaQuery');

jest.mock('q3-ui-locale', () => ({
  __esModule: true,
  ...jest.requireActual('q3-ui-locale'),
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => {
      const a = String(v).split(':');
      return a.length === 1 ? a[0] : a.slice(1).join('');
    }),
  }),
}));

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
