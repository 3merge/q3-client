import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ListItemSecondaryAction } from '@material-ui/core';
import useStyle from './styles';

const ListItemArrow = (props) => {
  const { icon, secondaryAction } = useStyle(props);
  const { arrow } = props;

  return arrow ? (
    <ListItemSecondaryAction className={secondaryAction}>
      <ArrowForwardIosIcon className={icon} />
    </ListItemSecondaryAction>
  ) : null;
};

ListItemArrow.defaultProps = {
  arrow: false,
};

ListItemArrow.propTypes = {
  arrow: PropTypes.bool,
};

export default ListItemArrow;
