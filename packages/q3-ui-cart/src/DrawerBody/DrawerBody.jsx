import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Signal, Connect } from 'q3-ui-assets';
import ErrorMessage from 'q3-ui/lib/error';
import { array } from 'q3-ui-helpers';
import { CartContext } from '../context';
import useStyle from './useStyle';

const getNamespace = (hasError) =>
  hasError ? 'cartError' : 'cartEmpty';

const DrawerBody = ({ children }) => {
  const { root } = useStyle();
  const { items = [], hasError } = React.useContext(
    CartContext,
  );

  const len = array.hasLength(items);
  const namespace = getNamespace(hasError);
  const Icon = hasError ? Signal : Connect;

  return (
    <Box component="section" className={root}>
      {!len || hasError ? (
        <ErrorMessage
          title={namespace}
          description={namespace}
          disableGutter
        >
          <Icon />
        </ErrorMessage>
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
