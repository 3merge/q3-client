import React from 'react';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import IconButton from 'q3-ui/lib/iconButton';
import { CartContext } from '../context';
import useStyle from './useStyle';

const DrawerTrash = () => {
  const { clear } = React.useContext(CartContext);
  const { trash } = useStyle();

  if (!clear) return null;

  return (
    <IconButton
      icon={RemoveShoppingCartIcon}
      label="startOver"
      buttonProps={{
        className: trash,
        onClick: () => {
          clear();
        },
      }}
    />
  );
};

DrawerTrash.defaultProps = {};
DrawerTrash.propTypes = {};

export default DrawerTrash;
