import React from 'react';
import PropTypes from 'prop-types';
import { Box, Hidden, Fade } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FlareIcon from '@material-ui/icons/Flare';
import useStyle from './useStyle';

const PollIndicator = ({ hasChange }) => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Fade in={hasChange}>
      <Box height="100%" display="flex">
        <Hidden smDown>
          <Box
            component="small"
            alignItems="center"
            display="flex"
          >
            <FlareIcon ref={ref} className={cls.dot} />
            <span className={cls.text}>
              {t('unsavedChanges')}
            </span>
          </Box>
        </Hidden>
      </Box>
    </Fade>
  );
};

PollIndicator.defaultProps = {
  hasChange: false,
};

PollIndicator.propTypes = {
  hasChange: PropTypes.bool,
};

export default PollIndicator;
