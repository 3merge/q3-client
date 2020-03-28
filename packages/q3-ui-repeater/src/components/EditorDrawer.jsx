import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import Pageview from '@material-ui/icons/Pageview';

const EditorDrawer = ({ children, ...rest }) =>
  children ? (
    <Dialog
      {...rest}
      variant="drawer"
      renderContent={children}
      renderTrigger={(onClick) => (
        <IconButton
          icon={Pageview}
          label="edit"
          buttonProps={{
            onClick,
          }}
        >
          <Pageview />
        </IconButton>
      )}
    />
  ) : null;

EditorDrawer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default EditorDrawer;
