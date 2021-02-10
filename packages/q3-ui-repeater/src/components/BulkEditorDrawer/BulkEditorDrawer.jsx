import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { array } from 'q3-ui-helpers';
import Auth from '../Auth';
import Context from '../state';

const BulkEditorDrawer = ({ ids, children, ...rest }) => {
  const { editBulk } = React.useContext(Context);

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
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  ids: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
};

export default BulkEditorDrawer;
