import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Graphic from 'q3-ui-assets';
import { array } from 'q3-ui-helpers';
import { CartContext } from '../context';
import useStyle from './useStyle';

const getNamespace = (hasError) =>
  hasError ? 'cartError' : 'cartEmpty';

const getIconName = (hasError) =>
  hasError ? 'Signal' : 'Connect';

const DrawerBody = ({ children }) => {
  const { root } = useStyle();
  const { items = [], hasError } = React.useContext(
    CartContext,
  );

  const len = array.hasLength(items);
  const namespace = getNamespace(hasError);
  const icon = getIconName(hasError);

  return (
    <Box component="section" className={root}>
      {!len || hasError ? (
        <Graphic title={namespace} icon={icon} />
      ) : (
        children
      )}
    </Box>
  );
};

DrawerBody.propTypes = {
  children: PropTypes.node.isRequired,
};

DrawerBody.defaultProps = {};

export default DrawerBody;
