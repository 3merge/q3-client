import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import { Link } from '@reach/router';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../state';

const TableLink = ({ id }) => {
  const { rootPath } = React.useContext(Definitions);
  const { t } = useTranslation('labels');

  return (
    <Tooltip arrow title={t('labels:view')}>
      <IconButton
        color="inherit"
        component={Link}
        to={`${rootPath}/${id}`}
      >
        <OpenInBrowserIcon />
      </IconButton>
    </Tooltip>
  );
};

TableLink.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

TableLink.displayName = 'TableLink';

export default TableLink;
