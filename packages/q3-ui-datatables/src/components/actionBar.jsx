import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useStyles, useCheckbox } from '../utils';
import Context from '../utils/context';

const ActionBarElement = ({ icon: Icon, ...rest }) => (
  <BottomNavigationAction
    {...rest}
    icon={<Icon />}
    showLabel
  />
);

const ActionBar = ({ children, actions }) => {
  const { action } = useStyles();
  const utils = useCheckbox();

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
