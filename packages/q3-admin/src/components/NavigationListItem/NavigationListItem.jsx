import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { array } from 'q3-ui-helpers';
import { compact, filter, map, size } from 'lodash';
import NavigationLinkWrapper, {
  isNotEmpty,
} from '../NavigationLinkWrapper';

export const getNodeId = (xs) => xs.to || xs.label;

export const filterByVisibility = (a) =>
  filter(
    a,
    ({ nestedMenuItems, visible }) =>
      array.hasLength(nestedMenuItems) || visible,
  );

export const shouldReturnNavigationLink = (items) =>
  compact(
    map(items, (item) => {
      const childrenItems = filterByVisibility(
        item.nestedMenuItems,
      );

      const shouldReturnNestedItems = isNotEmpty(
        childrenItems,
      );

      return shouldReturnNestedItems || item.to
        ? {
            ...item,
            nodeId: getNodeId(item),
            shouldReturnNestedItems,
            childrenItems,
          }
        : null;
    }),
  );

const NavigationListItem = ({ items }) => {
  const xs = shouldReturnNavigationLink(items);
  return map(
    xs,
    (
      {
        nodeId,
        childrenItems,
        shouldReturnNestedItems,
        ...item
      },
      i,
    ) => (
      <React.Fragment key={nodeId}>
        <NavigationLinkWrapper
          childrenItems={childrenItems}
          {...item}
        >
          {shouldReturnNestedItems && (
            <Box position="absolute" component="ul">
              <NavigationListItem items={childrenItems} />
            </Box>
          )}
        </NavigationLinkWrapper>
        {i !== size(xs) - 1 && (
          <Hidden lgUp>
            <Box my={0.5}>
              <Divider />
            </Box>
          </Hidden>
        )}
      </React.Fragment>
    ),
  );
};

export default NavigationListItem;
