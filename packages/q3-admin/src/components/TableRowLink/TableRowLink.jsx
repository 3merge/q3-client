import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton, Tooltip } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';

const TableRowLink = ({ id }) => {
  const { rootPath } = React.useContext(Definitions);
  const { t } = useTranslation('labels');

  return id ? (
    <Tooltip arrow title={t('view')}>
      <IconButton
        color="inherit"
        component={Link}
        to={`${rootPath}/${id}`}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Tooltip>
  ) : null;
};

TableRowLink.defaultProps = {
  id: null,
};

TableRowLink.propTypes = {
  id: PropTypes.string,
};

export default TableRowLink;
