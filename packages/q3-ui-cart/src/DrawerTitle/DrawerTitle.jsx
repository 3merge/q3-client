import React from 'react';
import { Hidden, Typography } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './useStyle';
import { DRAWER_TITLE_ID } from '../constants';

const DrawerTitle = () => {
  const { t } = useTranslation('titles');
  const { root } = useStyle();

  return (
    <Hidden smDown>
      <Typography
        id={DRAWER_TITLE_ID}
        variant="h2"
        className={root}
      >
        {t('cart')}
      </Typography>
    </Hidden>
  );
};

DrawerTitle.defaultProps = {};

DrawerTitle.propTypes = {};

export default DrawerTitle;
