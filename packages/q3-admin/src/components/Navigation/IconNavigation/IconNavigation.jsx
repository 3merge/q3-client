/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Grid, List } from '@material-ui/core';
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
    <Grid container style={{ height: '100%' }}>
      <Grid item xs="auto">
        <List className={cls.iconList}>
          {navigationMenus.map((item, i) => (
            <IconList {...item} key={`iconItem${i}`} />
          ))}
        </List>
      </Grid>
      <Grid item xs className={cls.navigation}>
        <Navigation
          menuItems={nests}
          className={cls.span}
        />
      </Grid>
    </Grid>
  );
};

export default IconNavigation;
