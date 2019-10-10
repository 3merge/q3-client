/* eslint-disable import/no-extraneous-dependencies */
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const {
  createMount,
  createShallow,
  createRender,
} = require('@material-ui/core/test-utils');

enzyme.configure({
  adapter: new Adapter(),
});

global.mount = createMount();
global.render = createRender();
global.shallow = createShallow();
