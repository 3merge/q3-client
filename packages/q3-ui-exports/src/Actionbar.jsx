import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { State } from './Context';

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

const ActionBar = ({ data }) => {
  const { hasChecked, setChecked } = React.useContext(
    State,
  );

  const len = hasChecked();

  React.useEffect(() => {
    if (len) setChecked([]);
  }, [data.length]);

  return null;
};

ActionBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

ActionBar.defaultProps = {
  data: [],
};

export default ActionBar;
