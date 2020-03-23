import React from 'react';
import PropTypes from 'prop-types';
import LayersClear from '@material-ui/icons/LayersClear';
import MergeType from '@material-ui/icons/MergeType';
import ImportExport from '@material-ui/icons/ImportExport';
import Fade from '@material-ui/core/Fade';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import useStyle from './useStyle';
import RepeaterState from './state';

const ActionBar = ({ actions }) => {
  const { multiselect } = React.useContext(RepeaterState);
  const { actionBar } = useStyle();

  return (
    <Fade in={multiselect.hasChecked()}>
      <div>
        <BottomNavigation className={actionBar}>
          <BottomNavigationAction
            onClick={multiselect.clear}
            icon={<LayersClear />}
            label={`Unselect ${multiselect.checked.length}`}
            showLabel
          />
          <BottomNavigationAction
            showLabel
            disabled
            label="Bulk edit"
            icon={<MergeType />}
          />
          <BottomNavigationAction
            showLabel
            disabled
            icon={<ImportExport />}
            label="Export"
          />
        </BottomNavigation>
      </div>
    </Fade>
  );
};

ActionBar.propTypes = {
  /**
   * Click handlers for bulk data modification.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      icon: PropTypes.node,
    }),
  ),
};

ActionBar.defaultProps = {
  actions: [],
};

export default ActionBar;
