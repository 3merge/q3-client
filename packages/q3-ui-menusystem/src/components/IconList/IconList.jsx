import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { map, size } from 'lodash';
import IconListItem from '../IconListItem';

const IconList = ({ items }) =>
  size(items) > 0 && (
    <List>
      {map(items, (item) => (
        <IconListItem key={item.label} {...item} />
      ))}
    </List>
  );

IconList.defaultProps = {
  items: [],
};

IconList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  ),
};

export default IconList;
