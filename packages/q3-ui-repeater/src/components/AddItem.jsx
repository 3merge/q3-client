import React from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';
import AddButton from './AddButton';

const AddItem = ({
  addComponent,
  create,
  children,
  initialValues,
  ...rest
}) => {
  return (
    <Auth op="Create">
      {addComponent ? (
        React.cloneElement(addComponent, {
          initialValues,
          create,
        })
      ) : (
        <AddButton
          create={create}
          initialValues={initialValues}
          {...rest}
        >
          {children}
        </AddButton>
      )}
    </Auth>
  );
};

AddItem.defaultProps = {
  addComponent: null,
};

AddItem.propTypes = {
  addComponent: PropTypes.node,
  children: PropTypes.node.isRequired,
  create: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

export default AddItem;
