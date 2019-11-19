import users from './users.json';
import profile from './profile.json';

export default (m) => {
  m.onGet('/users').reply(200, {
    total: users.length,
    hasNextPage: false,
    users,
  });

  m.onGet(/\/users\/\d+/).reply((c) => {
    const id = c.url.split('/').pop();
    const user = users.find((u) => u.id === Number(id));
    return [200, { user }];
  });

  m.onGet(/profile/).reply((v) =>
    v.headers.authorization === 'Bearer 1'
      ? [200, profile]
      : [401],
  );

  return m;
};
