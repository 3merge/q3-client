import Cookies from 'js-cookie';
import AuthenticationDependencyInjection from '../header';
import { NONCE } from '../constants';

jest.mock('js-cookie');

describe('AuthenticationDependencyInjection', () => {
  it('should fetch from cookies', () => {
    const inst = new AuthenticationDependencyInjection({});
    Cookies.get.mockReturnValue(1);
    expect(inst.tokens).toMatchObject({
      token: 1,
      nonce: 1,
    });
  });

  it('should set headers', () => {
    const inst = new AuthenticationDependencyInjection({});
    inst.headers = { token: 1, nonce: 1 };
    expect(inst.config.headers.common).toHaveProperty(
      NONCE,
      1,
    );

    expect(inst.config.headers.common).toHaveProperty(
      'Authorization',
      'Bearer 1',
    );
  });
});
