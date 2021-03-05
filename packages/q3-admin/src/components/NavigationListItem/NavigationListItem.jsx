import React from 'react';
import Box from '@material-ui/core/Box';
import { array } from 'q3-ui-helpers';
import { compact, filter, map } from 'lodash';
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

const NavigationListItem = ({ items }) =>
  map(
    shouldReturnNavigationLink(items),
    ({
      nodeId,
      childrenItems,
      shouldReturnNestedItems,
      ...item
    }) => (
      <NavigationLinkWrapper
        key={nodeId}
        childrenItems={childrenItems}
        {...item}
      >
        {shouldReturnNestedItems && (
          <Box position="absolute" component="ul">
            <NavigationListItem items={childrenItems} />
          </Box>
        )}
      </NavigationLinkWrapper>
    ),
  );

export default NavigationListItem;
