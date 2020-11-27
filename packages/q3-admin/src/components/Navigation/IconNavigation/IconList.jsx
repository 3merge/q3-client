import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Popper } from '@material-ui/core';
import useStyles from './useStyles';

const IconList = ({ label, icon: Icon, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  if (!Icon) return null;

  const cls = useStyles();
  const ref = React.useRef();

  return (
    <>
      <ListItem
        onClick={onClick}
        onMouseOver={handleOpen}
        onMouseLeave={handleClose}
        ref={ref}
      >
        <div className={cls.iconWrapper}>
          <Icon />
        </div>
      </ListItem>
      <Popper
        open={isOpen}
        anchorEl={ref.current}
        className={cls.popper}
        placement="bottom-start"
      >
        <span>{label}</span>
      </Popper>
    </>
  );
};

IconList.propTypes = {
  label: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconList;
