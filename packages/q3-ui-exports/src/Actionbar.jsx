import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { State } from './Context';
import DataToCsv from './DataToCsv';
import DataToExcel from './DataToExcel';
import Unselect from './Unselect';
import useStyle from './useStyle';

const assignId = (o = {}, index = 0) => {
  const item = { ...o };
  if (!item.id) item.id = index;
  return item;
};

const matches = (arr = [], id) =>
  arr && arr.length
    ? arr.map(String).includes(String(id))
    : true;

export const renderActions = (actions, t, picked) =>
  Array.isArray(actions)
    ? actions.map((a) => (
        <BottomNavigationAction
          {...a}
          key={a.label}
          label={t(a.label)}
          onClick={
            a.onClick
              ? (e) => a.onClick(e, picked)
              : undefined
          }
          showLabel
        />
      ))
    : null;

export const intersects = (data = [], ids = []) =>
  Array.isArray(data)
    ? data.map(assignId).filter((v) => matches(ids, v.id))
    : [];

const ActionBar = ({ actions, data, position }) => {
  const { t } = useTranslation('labels');
  const {
    hasChecked,
    checked,
    setChecked,
  } = React.useContext(State);
  const picked = intersects(data, checked);
  const { actionBar } = useStyle({
    position,
  });

  const len = hasChecked();

  React.useEffect(() => {
    if (len) setChecked([]);
  }, [data.length]);

  if (!len) return null;

  return (
    <BottomNavigation className={actionBar}>
      <Unselect />
      <DataToCsv data={picked} />
      <DataToExcel data={picked} />
      {renderActions(actions, t, picked)}
    </BottomNavigation>
  );
};

ActionBar.propTypes = {
  /**
   * Custom action handlers
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      icon: PropTypes.node,
    }),
  ),

  /**
   * Active data for manipulating and/or export
   */
  data: PropTypes.arrayOf(PropTypes.object),

  /**
   * CSS attribute of the actionbar.
   */
  position: PropTypes.string,
};

ActionBar.defaultProps = {
  actions: [],
  data: [],
  position: 'sticky',
};

export default ActionBar;
