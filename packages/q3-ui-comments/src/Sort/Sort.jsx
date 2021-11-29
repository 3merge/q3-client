import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { useToggle } from 'useful-state';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useTranslation } from 'q3-ui-locale';

const Sort = ({ children }) => {
  const { state, toggle } = useToggle(true);
  const { t } = useTranslation('labels');

  const renderLabel = (key, iconEl) => (
    <>
      {t(key)}
      {iconEl}
    </>
  );

  return children(
    state,
    <Box align="right">
      <Button onClick={toggle}>
        {state
          ? renderLabel(
              'newestToOldest',
              <ArrowDownwardIcon />,
            )
          : renderLabel(
              'oldestToNewest',
              <ArrowUpwardIcon />,
            )}
      </Button>
    </Box>,
  );
};

Sort.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Sort;
