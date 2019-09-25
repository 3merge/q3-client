import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import { Axios } from 'q3-admin';

const mock = new MockAdapter(Axios);

mock
  .onPost('/authenticate')
  .replyOnce(200, {
    token: 'foo',
    nonce: 'bar'
  });

console.log(Cookies.get('q3-nonce'))
mock
  .onGet('/profile')
  .replyOnce(() => {
    if (Cookies.get('q3-nonce') || Cookies.get('q3-token')) {
      return [
        200, {
          profile: {
            firstName: 'Mike',
            lastName: 'Ibberson',
          },
        },
      ];
    } else {
      return [401];
    }
  });
