import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import MuiList from '@material-ui/core/List';
import ListItem from '../ListItem';
import ListItemFolder from '../ListItemFolder';
import withAlertNoFiles from '../withAlertNoFiles';

const List = ({ files, siblings }) => (
  <MuiList
    id="q3-filemanager-list-view"
    style={{
      padding: 0,
    }}
  >
    {map(siblings, (item) => (
      <ListItemFolder key={item.name} {...item} />
    ))}
    {map(files, (item) => (
      <ListItem key={item.name} {...item} />
    ))}
  </MuiList>
);

List.defaultProps = {
  files: [],
  siblings: [],
};

List.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  siblings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

const ListComponent = withAlertNoFiles(List);
ListComponent.displayName = 'list';
export default ListComponent;
