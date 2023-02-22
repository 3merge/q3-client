import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import useStyle from './styles';

const ToolbarHeaderIcon = ({ value }) => (
  <>
    <TitleIcon />
    <Box className={useStyle().root}>{String(value)}</Box>
  </>
);

ToolbarHeaderIcon.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ToolbarHeaderIcon;
