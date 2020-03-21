import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useChecked } from 'useful-state';
import Context from '../utils/context';
import { useStyles } from '../utils';

const ActionBarElement = ({ icon: Icon, ...rest }) => (
  <BottomNavigationAction
    {...rest}
    icon={<Icon />}
    showLabel
  />
);

ActionBarElement.propTypes = {
  /**
   * Material UI SVG icon element
   */
  icon: PropTypes.node.isRequired,
};

const ActionBar = ({ children, actions }) => {
  const { action } = useStyles();

  const utils = useChecked();

  return (
    <Context.Provider value={utils}>
      {children}
      <div className={action}>
        <Collapse in={utils.hasChecked(utils)}>
          <div>
            <BottomNavigation>
              {Array.isArray(actions)
                ? actions.map((a) => (
                    <ActionBarElement
                      {...a}
                      onClick={() =>
                        a.onClick(utils.checked)
                      }
                    />
                  ))
                : null}
            </BottomNavigation>
          </div>
        </Collapse>
      </div>
    </Context.Provider>
  );
};

ActionBar.propTypes = {
  /**
   * The element containing checkboxes/actions.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),

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
  children: null,
};

export default ActionBar;
