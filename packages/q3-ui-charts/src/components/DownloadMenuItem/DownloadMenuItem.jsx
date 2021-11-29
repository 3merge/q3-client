import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { capitalize } from 'lodash';
import { useTranslation } from 'q3-ui-locale';

const DownloadMenuItem = React.forwardRef(
  ({ onClick, label }, ref) => {
    const { t } = useTranslation('labels');

    return (
      <MenuItem
        id={`chart-download-option-${label}`}
        onClick={onClick}
        ref={ref}
        style={{ margin: 0 }}
      >
        {t(`downloadAs${capitalize(label)}`)}
      </MenuItem>
    );
  },
);

DownloadMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DownloadMenuItem;
