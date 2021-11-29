import { compact } from 'lodash';
import { useTranslation } from 'q3-ui-locale';

export default () => (key, value) =>
  useTranslation('labels').t(
    compact([key, value]).join('-'),
  );
