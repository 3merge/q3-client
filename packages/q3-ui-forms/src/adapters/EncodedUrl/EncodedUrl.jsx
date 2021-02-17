import React from 'react';
import { withLocation } from 'with-location';
import PropTypes from 'prop-types';
import { useQueryParams } from 'q3-ui-queryparams';
import { Form } from '../../builders';

const EncodedUrl = ({
  children,
  navigate,
  location,
  initialValues,
  query,
  withClear,
  onSave,
  ...props
}) => {
  const qp = useQueryParams();
  const init = qp.decode(
    // allowed to override with empty string
    query === undefined ? location.search : query,
    initialValues,
  );

  return (
    <Form
      {...props}
      enableSubmit={false}
      onSubmit={(values) =>
        (onSave || navigate)(qp.encode(values))
      }
      initialValues={init}
    >
      {children}
    </Form>
  );
};

EncodedUrl.propTypes = {
  children: PropTypes.node.isRequired,
  navigate: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  withClear: PropTypes.bool,
  query: PropTypes.string,
  initialValues: PropTypes.shape({}),
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

EncodedUrl.defaultProps = {
  onSave: null,
  withClear: false,
  query: undefined,
  initialValues: {},
};

/**
 * @NOTE
 * There is some duplication with utilities available through this HOC.
 * Some of this logic is very particular to our implementation, though, so it'll remain separate for now.
 */
export default withLocation(EncodedUrl);
