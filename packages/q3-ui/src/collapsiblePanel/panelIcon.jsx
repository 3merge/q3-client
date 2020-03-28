import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

const PanelIcon = ({ hasChildren }) =>
  hasChildren ? <ExpandMoreIcon /> : <Box width="1em" />;

PanelIcon.propTypes = {
  // eslint-disable-next-line
  hasChildren: PropTypes.any,
};

PanelIcon.defaultProps = {
  hasChildren: false,
};

export default PanelIcon;
