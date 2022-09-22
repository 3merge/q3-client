import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, Typography } from '@material-ui/core';
import { isObject, size } from 'lodash';
import useSegmentsWithPages from '../useSegmentsWithPages';
import NavbarListItem from '../NavbarListItem';
import NavbarListItemContext from '../NavbarListItemContext';
import SegmentList from '../SegmentList';
import withDomTreeToSegments from '../withDomTreeToSegments';
import useStyle from './styles';
import { isUndefined } from '../utils';

const SegmentListWithDomTracking =
  withDomTreeToSegments(SegmentList);

const Navbar = ({ items }) => {
  const wp = useSegmentsWithPages();
  const cls = useStyle();

  if (!isObject(items) || size(Object.keys(items)) === 0)
    return null;

  // leave the fragment in place
  // otherwise storybook doesn't render props table ...
  return (
    <>
      {Object.entries(items).map(
        ([parentTitle, menuItems]) => (
          <Box
            key={parentTitle}
            position="relative"
            px={1.5}
          >
            {!isUndefined(parentTitle) && (
              <Typography
                className={cls.subheader}
                component="p"
                variant="overline"
              >
                {parentTitle}
              </Typography>
            )}
            <List>
              {wp(menuItems).map((menuItem) => {
                const { collectionName } = menuItem;

                return (
                  <NavbarListItemContext.Provider
                    key={collectionName}
                    // eslint-disable-next-line
                    value={{ collectionName }}
                  >
                    <NavbarListItem {...menuItem}>
                      <SegmentListWithDomTracking
                        isTopTier
                        {...menuItem}
                      />
                    </NavbarListItem>
                  </NavbarListItemContext.Provider>
                );
              })}
            </List>
          </Box>
        ),
      )}
    </>
  );
};

Navbar.defaultProps = {
  items: {},
};

Navbar.propTypes = {
  /**
   * Each key in this object corresponds to a menu grouping.
   * Each value expects an array of `NavbarListItem` props.
   * When you don't wish to group your pages, simply leave the first key as `undefined` and put all your pages there.
   */
  items: PropTypes.shape({
    undefined: PropTypes.arrayOf(
      PropTypes.shape({
        collectionName: PropTypes.string,
        icon: PropTypes.elementType,
        label: PropTypes.string,
        // eslint-disable-next-line
        segments: PropTypes.array,
        to: PropTypes.string,
      }),
    ),
  }),
};

export default Navbar;
