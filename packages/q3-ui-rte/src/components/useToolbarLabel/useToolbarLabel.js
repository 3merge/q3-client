import { compact } from 'lodash';
import { useTranslation } from 'react-i18next';

export default () => (key, value) =>
  useTranslation('labels').t(
    compact([key, value]).join('-'),
  );
