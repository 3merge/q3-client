import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../hooks';
import SidePanel from '../../components/SidePanel';

const DetailSidePanel = ({ children, ...props }) => {
  const { can } = useAppContext({
    // used to hide the sidebar overall
    aside: true,
    ...props,
  });

  return can('aside') ? (
    <SidePanel id="q3-tabber">{children}</SidePanel>
  ) : null;
};

DetailSidePanel.propTypes = {
  children: PropTypes.node,
  documentation: PropTypes.node,
  files: PropTypes.node,
  notes: PropTypes.node,
};

DetailSidePanel.defaultProps = {
  children: null,
  documentation: null,
  files: null,
  notes: null,
};

export default DetailSidePanel;
