import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Hidden } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'q3-ui-locale';

const BulkProviderSelect = ({
  count,
  onDeselectAll,
  onSelectAll,
  show,
}) => {
  const { t } = useTranslation('labels');

  return show ? (
    <Hidden smDown>
      <Box
        position="absolute"
        top={0}
        right={0}
        className="notifications-bulk-buttons"
      >
        {count ? (
          <Button
            color="inherit"
            onClick={onDeselectAll}
            startIcon={<ClearIcon />}
          >
            {t('unselectAll')}
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={onSelectAll}
            startIcon={<DoneAllIcon />}
          >
            {t('selectAll')}
          </Button>
        )}
      </Box>
    </Hidden>
  ) : null;
};

BulkProviderSelect.defaultProps = {
  count: 0,
  show: false,
};

BulkProviderSelect.propTypes = {
  count: PropTypes.number,
  onDeselectAll: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default React.memo(BulkProviderSelect);
