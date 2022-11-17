import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Hidden,
  IconButton,
} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { useTranslation } from 'q3-ui-locale';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const BulkProviderSelect = ({
  count,
  onDeselectAll,
  onSelectAll,
  show,
}) => {
  const { t } = useTranslation('labels');
  const renderButton = ({ icon, label, onClick }) => (
    <>
      <Hidden smDown>
        <Button
          color="inherit"
          onClick={onClick}
          startIcon={icon}
        >
          {t(label)}
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          aria-label={t(label)}
          color="inherit"
          onClick={onClick}
        >
          {icon}
        </IconButton>
      </Hidden>
    </>
  );

  if (!show) return null;

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      className="notifications-bulk-buttons"
    >
      {count
        ? renderButton({
            icon: <ClearAllIcon />,
            label: 'unselectAll',
            onClick: onDeselectAll,
          })
        : renderButton({
            icon: <DoneAllIcon />,
            label: 'selectAll',
            onClick: onSelectAll,
          })}
    </Box>
  );
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
