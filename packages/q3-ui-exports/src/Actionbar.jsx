import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { useTranslation } from 'react-i18next';
import Fade from '@material-ui/core/Fade';
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

const redact = (arr = [], item) =>
  arr.length ? pick(item, arr.concat(['id'])) : item;

export const intersects = (
  data = [],
  columns = [],
  ids = [],
) =>
  (Array.isArray(data)
    ? data.map(assignId).map((d) => redact(columns, d))
    : []
  ).filter((v) => matches(ids, v.id));

export const renderActions = (actions, t) =>
  Array.isArray(actions)
    ? actions.map((a) => (
        <BottomNavigationAction
          {...a}
          key={a.label}
          label={t(a.label)}
          showLabel
        />
      ))
    : null;

const ActionBar = ({ actions, data, columns }) => {
  const { t } = useTranslation('labels');
  const { hasChecked, checked } = React.useContext(State);
  const picked = intersects(data, columns, checked);
  const { actionBar } = useStyle();

  return (
    <Fade in={hasChecked()}>
      <div>
        <BottomNavigation className={actionBar}>
          <Unselect />
          <DataToCsv data={picked} />
          <DataToExcel data={picked} />
          {renderActions(actions, t)}
        </BottomNavigation>
      </div>
    </Fade>
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
   * An array of active keys to read from the date.
   */
  columns: PropTypes.arrayOf(String),
};

ActionBar.defaultProps = {
  columns: [],
  actions: [],
  data: [],
};

export default ActionBar;
