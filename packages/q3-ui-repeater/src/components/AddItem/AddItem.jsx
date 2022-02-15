import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Auth from '../Auth';
import AddButton from '../AddButton';
import RepeaterContext from '../state';

const AddItem = ({
  addComponent,
  children,
  initialValues,
}) => {
  const { disableAdd, create, collectionName, name } =
    React.useContext(RepeaterContext);

  return !disableAdd ? (
    <Auth op="Create">
      <Grid item>
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
      </Grid>
    </Auth>
  ) : null;
};

AddItem.defaultProps = {
  addComponent: null,
};

AddItem.propTypes = {
  addComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

export default AddItem;
