import { invoke } from 'lodash';
import { string } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';

export const acceptFormatOptions = [
  'toFullName',
  'toTruthy',
  'toDate',
  'toPrice',
  'toCheck',
  'toTel',
];

const useStringHelper = (value, options) =>
  useTranslation('labels').t(
    acceptFormatOptions.includes(options?.format)
      ? invoke(string, options.format, value)
      : String(value),
  );

export default useStringHelper;
