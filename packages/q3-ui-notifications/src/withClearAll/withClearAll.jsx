import React from 'react';
import { Box, Button } from '@material-ui/core';
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
      {isFunction(more) && (
        <Box py={1} px={2}>
          <Button
            color="secondary"
            onClick={more}
            fullWidth
            variant="contained"
          >
            {t('seeAllNotifications')}
          </Button>
        </Box>
      )}
    </>
  );
};

export default withClearAll;
