import React from 'react';
import { List } from '@material-ui/core';
import { map, size } from 'lodash';
import SubListItem from '../SubListItem';
import useStyle from './styles';

// <ListItem component="div" className={cls.segments}>

const SubList = ({ items }) => {
  const cls = useStyle();

  return size(items) ? (
    <List className={cls.list}>
      {map(items, (item) => (
        <SubListItem key={item.label} {...item} />
      ))}
    </List>
  ) : null;
};

SubList.defaultProps = {
  items: [],
};

SubList.propTypes = {};

export default SubList;
