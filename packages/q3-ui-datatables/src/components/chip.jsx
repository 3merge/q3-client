import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: () => ({
    backgroundColor: '#FFF !important',
    boxShadow: theme.shadows[2],
    transform: 'scale(1.5)',
    marginRight: '0 !important',
    display: 'inline-block',
  }),
  chip: ({ color }) => ({
    backgroundColor: color,
    boxShadow: theme.shadows[1],
  }),
  icon: ({ color }) => ({
    backgroundColor: '#FFF',
    color,
    transform: 'scale(0.5)',
  }),
}));

const TableChip = ({ icon: Icon, label, color }) => {
  const cls = useStyle({ color });

  return (
    <Chip
      avatar={
        <Avatar className={cls.root}>
          <Icon className={cls.icon} />
        </Avatar>
      }
      label={label}
      color="primary"
      className={cls.chip}
    />
  );
};

TableChip.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default TableChip;
