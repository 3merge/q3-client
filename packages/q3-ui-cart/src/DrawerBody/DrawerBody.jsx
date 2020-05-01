import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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
    <Container className={root}>
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
    </Container>
  );
};

DrawerBody.propTypes = {
  children: PropTypes.node.isRequired,
};

DrawerBody.defaultProps = {};

export default DrawerBody;
