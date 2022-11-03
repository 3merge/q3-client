import React from 'react';
import ReactDOM from 'react-dom';
import { useBrowserEffect } from '../../hooks';

const ToolbarPortal = ({ id, children }) => {
  const [anchor, setAnchor] = React.useState();

  useBrowserEffect(
    () => setAnchor(document.getElementById(id)),
    [id],
    { useLayout: true },
  );

  return anchor
    ? ReactDOM.createPortal(children, anchor)
    : null;
};

export default ToolbarPortal;
