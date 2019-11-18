import Cookies from 'js-cookie';
import { NONCE, TOKEN } from './constants';

export default class AuthenticationDependencyInjection {
  constructor(config = {}) {
    this.config = config;
    this.cookies = Cookies;
  }

  get tokens() {
    const token = this.cookies.get(TOKEN);
    const nonce = this.cookies.get(NONCE);
    return { token, nonce };
  }

  set headers({ token, nonce }) {
    this.config.headers = {};
    this.config.headers.authorization = `Bearer ${token}`;
    this.config.headers[NONCE] = nonce;
  }
}
