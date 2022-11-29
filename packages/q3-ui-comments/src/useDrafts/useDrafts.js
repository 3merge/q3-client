import { compact } from 'lodash';
import { browser } from 'q3-ui-helpers';

const useDrafts = ({
  collectionName,
  id,
  initialValues,
}) => {
  const fieldId = compact([
    collectionName,
    id,
    initialValues?.replies,
  ]).join('-');

  return {
    fieldId,
    remove() {
      browser.proxyLocalStorageApi(
        'removeItem',
        `q3-rte-${fieldId}`,
      );
    },
  };
};

export default useDrafts;
