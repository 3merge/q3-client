import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { array } from 'q3-ui-helpers';
import RepeaterState from './state';
import Auth from './Auth';

const BulkEditorDrawer = ({ ids, children, ...rest }) => {
  const { editBulk } = React.useContext(RepeaterState);

  return editBulk && array.hasLength(ids) ? (
    <Auth op="Update">
      <Dialog
        title="editMany"
        renderContent={(close) => {
          const args = {
            onSubmit: editBulk(ids, close),
          };

          return typeof children === 'function'
            ? children(args)
            : React.cloneElement(children, args);
        }}
        {...rest}
      />
    </Auth>
  ) : null;
};

BulkEditorDrawer.propTypes = {
  children: PropTypes.func.isRequired,
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BulkEditorDrawer;
