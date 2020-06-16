const { last } = require('lodash');

export const useTranslation = () => ({
  t: jest
    .fn()
    .mockImplementation((v = '') => last(v.split(':'))),
});
