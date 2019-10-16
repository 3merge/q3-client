import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import Axios from 'axios';

const mock = new MockAdapter(Axios, {
  delayResponse: 1000,
});

mock.onPost('/authenticate').replyOnce(200, {
  token: 'foo',
  nonce: 'bar',
});

mock.onGet('/profile').replyOnce(() => {
  if (Cookies.get('q3-nonce') || Cookies.get('q3-token')) {
    return [
      200,
      {
        profile: {
          firstName: 'Mike',
          lastName: 'Ibberson',
        },
      },
    ];
  }
  return [401];
});

mock.onGet(/\/users\/\d+/).reply(200, {
  user: {
    id: 1,
    name: 'Charles',
    email: 'charles@example.app',
    age: 32,
  },
});

mock.onGet(/users\/?\?*/).reply(({ url }) => [
  200,
  {
    users: [
      {
        id: 1,
        name: 'Charles',
        email: 'charles@example.app',
        age: 32,
      },
      {
        id: 2,
        name: 'Helen',
        email: 'helen@example.app',
        age: 91,
      },
      ...(!url.includes('?search')
        ? [
            {
              id: 3,
              name: 'Roger',
              email: 'roger@example.app',
              age: 11,
            },
            {
              id: 4,
              name: 'Marla',
              email: 'marla@example.app',
              age: 21,
            },
          ]
        : []),
    ],
  },
]);

mock.onGet(/permissions\/?\?*/).reply(200, {
  permissions: {
    id: 1,
    role: 'Admin',
    op: 'Read',
    coll: 'q3-api-permissions',
  },
});
