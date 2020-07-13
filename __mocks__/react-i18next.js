import { last } from 'lodash';

export {
  initReactI18next,
  I18nextProvider,
} from 'react-i18next';

export const useTranslation = () => ({
  t: jest
    .fn()
    .mockImplementation((v = '') => last(v.split(':'))),
});
