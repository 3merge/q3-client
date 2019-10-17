import { loadReCaptcha } from 'react-recaptcha-google';
import Login from './login';
import PasswordReset from './passwordReset';
import Reverify from './reverify';
import Verify from './verify';

export { Login, PasswordReset, Reverify, Verify };
export default () => loadReCaptcha();
