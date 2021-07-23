import React from 'react';
import PropTypes from 'prop-types';
import Add from '../add';
import { useAppContext } from '../../hooks';
import withActionPortal from '../../components/withActionPortal';

const CollectionActions = ({ addComponent: AddForm }) =>
  useAppContext({
    add: AddForm ? (
      <Add>
        <AddForm />
      </Add>
    ) : null,
  }).can('add');

CollectionActions.defaultProps = {
  addComponent: null,
};

CollectionActions.propTypes = {
  addComponent: PropTypes.node,
};

export default withActionPortal(CollectionActions, {
  elementId: 'q3-collection-actions-top',
});
