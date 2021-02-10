import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../Auth';
import AddButton from '../AddButton';
import RepeaterContext from '../state';

const AddItem = ({
  addComponent,
  children,
  initialValues,
}) => {
  const { create, collectionName, name } = React.useContext(
    RepeaterContext,
  );

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
          collectionName={collectionName}
          name={name}
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
  initialValues: PropTypes.shape({}).isRequired,
};

export default AddItem;
