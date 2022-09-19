import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ListItemSecondaryAction } from '@material-ui/core';
import useStyle from './styles';

const ListItemArrow = (props) => {
  const { icon, secondaryAction } = useStyle(props);

  return (
    <ListItemSecondaryAction className={secondaryAction}>
      <ArrowForwardIosIcon className={icon} />
    </ListItemSecondaryAction>
  );
};

export default ListItemArrow;
