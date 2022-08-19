import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import MobileAppBar from '../MobileAppBar';

const MobileDrawer = ({ children }) => (
  <Dialog
    PaperProps={{
      style: {
        maxWidth: '320px',
      },
    }}
    anchor="left"
    closeOnRouteChange
    closeOnSearchChange
    renderContent={() => children}
    renderTrigger={(onClick) => (
      <MobileAppBar onClick={onClick} />
    )}
    title="menu"
    variant="drawer"
  />
);

MobileDrawer.defaultProps = {
  children: null,
};

MobileDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default MobileDrawer;
