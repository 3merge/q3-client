import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SidePanelContent from '../../components/SidePanelContent';
import { Definitions } from '../state';
import { useActiveFilter } from '../../hooks';
import SegmentName from '../../components/SegmentName';
import SegmentAdd from '../../components/SegmentAdd';
import SegmentDropdownMenu from '../../components/SegmentDropdownMenu';
import SegmentListItem from '../../components/SegmentListItem';

const getSearchValues = (a) =>
  a.map((item) => item.searchValue);

const Segments = ({ children, disableSegments }) => {
  const { location } = React.useContext(Definitions);
  const {
    add,
    modify,
    remove,
    filters,
    favourite,
    main,
  } = useActiveFilter(location?.search);

  const listItems = [
    {
      label: 'All',
      searchValue: '?active',
    },
    ...filters,
  ];

  return (
    <SidePanelContent title="Segments">
      <Box id="q3-segments">
        <List style={{ margin: 0, padding: 0 }}>
          {listItems.map(
            ({
              searchValue,
              value,
              label,
              fromProfile,
            }) => (
              <SegmentListItem
                key={label}
                href={searchValue}
                isStarred={main === label}
                siblings={getSearchValues(listItems)}
                label={label}
              >
                <SegmentDropdownMenu
                  isDefault={!fromProfile}
                  onFavourite={() => favourite(label)}
                  onRemove={() => remove(label)}
                  disableSegments={disableSegments}
                >
                  <SegmentName name={label}>
                    {(name, renderInput) =>
                      children(
                        renderInput,
                        modify(name, label),
                        value,
                      )
                    }
                  </SegmentName>
                </SegmentDropdownMenu>
              </SegmentListItem>
            ),
          )}
          {!disableSegments && <SegmentAdd onSave={add} />}
        </List>
      </Box>
    </SidePanelContent>
  );
};

Segments.defaultProps = {
  disableSegments: false,
};

Segments.propTypes = {
  children: PropTypes.func.isRequired,
  disableSegments: PropTypes.bool,
};

export default Segments;
