require('./models');
const Q3 = require('q3-api');

Q3.config({
  authorization: {
    roles: ['Administrator'],
  },
});

Q3.routes();
Q3.connect().then(() => {
  // noop
});
