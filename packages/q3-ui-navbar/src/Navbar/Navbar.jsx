import React from 'react';
import { Box, List, Typography } from '@material-ui/core';
import { size } from 'lodash';
import useSegmentsWithPages from '../useSegmentsWithPages';
import NavbarListItem from '../NavbarListItem';
import SegmentList from '../SegmentList';

const getSegmentSortIdx = (xs, previousIndex = 0) =>
  size(xs) > 0
    ? xs.map((item, idx) => {
        const sortingIndex =
          idx +
          previousIndex +
          xs
            .slice(0, idx)
            .reduce(
              (acc, curr) => acc + size(curr.segments),
              0,
            );

        return {
          ...item,
          segments: getSegmentSortIdx(
            item.segments,
            sortingIndex + 1,
          ),
        };
      })
    : [];

const Navbar = ({ items }) => {
  const wp = useSegmentsWithPages();

  return Object.entries(items).map(
    ([parentTitle, menuItems]) => (
      <Box position="relative" px={1.5}>
        <Box mb={-0.5}>
          <Typography
            variant="overline"
            style={{
              color: 'inherit',
              textTransform: 'none',
              opacity: 0.8,
              textAlign: 'center',
            }}
          >
            {parentTitle}
          </Typography>
        </Box>

        <List>
          {wp(menuItems).map((menuItem) => {
            const segments = getSegmentSortIdx(
              menuItem.segments,
            );

            return (
              <NavbarListItem
                {...menuItem}
                segments={segments}
              >
                <SegmentList segments={segments} />
              </NavbarListItem>
            );
          })}
        </List>
      </Box>
    ),
  );
};

export default Navbar;
