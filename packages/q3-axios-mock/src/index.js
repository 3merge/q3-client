import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default ({ define, children, delay = 200 }) => {
  const mock = new MockAdapter(Axios, {
    delayResponse: delay,
  });

  mock.onPost(/verify/).reply(204);
  mock.onPost(/reverify/).reply(204);

  mock.onPost(/password-reset/).reply(204, {
    message: 'If the email exists, you will get a message',
  });

  mock.onPost(/authenticate/).reply(201, {
    token: 1,
    nonce: 1,
  });

  mock.onGet(/authenticate/).reply(({ url }) =>
    url.includes('foo@bar')
      ? [204]
      : [
          400,
          {
            errors: {
              email: 'Unknown account',
            },
          },
        ],
  );

  if (define && typeof define === 'function') {
    define(mock);
  }

  return children;
};
