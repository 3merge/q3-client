import i18next from 'i18next';
import { locale } from 'moment';
import { setLocale } from 'yup';
import deps from './deps';

jest.mock('moment', () => ({
  locale: jest.fn(),
}));

jest.mock('yup', () => ({
  setLocale: jest.fn(),
}));

jest.mock('./resources/en/yup.json', () => ({
  foo: 'bar',
}));

describe('Locale dependency fn', () => {
  it('should set locale on moment and yup', () => {
    i18next.language = 'en';
    deps();
    expect(locale).toHaveBeenCalledWith('en');
    expect(setLocale).toHaveBeenCalledWith({
      foo: 'bar',
    });
  });
});
