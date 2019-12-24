import React from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

export const TableContext = React.createContext();
const { Provider } = TableContext;

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    boxShadow: theme.shadows[14],
    left: 0,
    position: 'fixed',
    width: '100%',
  },
}));

export const useCheckboxes = () => {
  const [checked, setChecked] = React.useState([]);
  const clear = React.useCallback(() => setChecked([]));

  const isChecked = React.useCallback(
    (key) => checked.includes(key),
    [checked],
  );

  const onCheck = (key) => () =>
    setChecked(
      checked.includes(key)
        ? checked.filter((i) => i !== key)
        : checked.concat(key),
    );

  const hasChecked = () =>
    React.useCallback(Boolean(checked && checked.length), [
      checked,
    ]);

  return {
    checked,
    setChecked,
    onCheck,
    isChecked,
    clear,
    hasChecked,
  };
};

const TableActionBar = ({ children, actions }) => {
  const { root } = useStyles();
  const utils = useCheckboxes();

  return (
    <Provider value={utils}>
      {children}
      <div className={root}>
        <Collapse in={utils.hasChecked(utils)}>
          <div>
            <BottomNavigation>
              {actions.map(
                ({ label, onClick, icon: Icon }) => (
                  <BottomNavigationAction
                    label={label}
                    onClick={() => onClick(utils.checked)}
                    icon={<Icon />}
                    showLabel
                  />
                ),
              )}
            </BottomNavigation>
          </div>
        </Collapse>
      </div>
    </Provider>
  );
};

TableActionBar.defaultProps = {
  actions: [],
};

export default TableActionBar;
