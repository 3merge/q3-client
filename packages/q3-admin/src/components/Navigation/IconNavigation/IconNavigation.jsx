/* eslint-disable react/prop-types */
import React from 'react';
import { Box, List } from '@material-ui/core';
import { useNavigation } from 'q3-hooked';
import NavigationList from '../NavigationList';
import { withoutUseNavigation } from '../withNavigation';
import NavigationListItem from '../NavigationLIstItem';
import IconList from './IconList';
import useStyles from './useStyles';

const Navigation = withoutUseNavigation(
  NavigationList,
  NavigationListItem,
);

const IconNavigation = ({ menuItems }) => {
  const { navigationMenus } = useNavigation(menuItems);
  const cls = useStyles();
  const nests = navigationMenus
    .reduce((acc, x) => {
      if (x.nestedMenuItems && x.isExpanded) {
        acc.push(
          x.nestedMenuItems.map((y) => ({
            ...y,
            visible: true,
          })),
        );
      }
      return acc;
    }, [])
    .flat();

  return (
    <Box display="flex">
      <List className={cls.iconList}>
        {navigationMenus.map((item, i) => (
          <IconList {...item} key={`iconItem${i}`} />
        ))}
      </List>
      <Navigation menuItems={nests} className={cls.span} />
    </Box>
  );
};

export default IconNavigation;
