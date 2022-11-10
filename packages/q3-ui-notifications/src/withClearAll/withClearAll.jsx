import React from 'react';
import { Button } from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { useTranslation } from 'q3-ui-locale';
import { isFunction } from 'lodash';

const withClearAll = (Component) => (props) => {
  // eslint-disable-next-line
  const { clear, more } = props;
  const { t } = useTranslation('labels');

  return (
    <>
      {isFunction(clear) && (
        <Button
          onClick={clear}
          startIcon={<ClearAllIcon />}
        >
          {t('markAllAsSeen')}
        </Button>
      )}
      <Component {...props} />
    </>
  );
};

export default withClearAll;
