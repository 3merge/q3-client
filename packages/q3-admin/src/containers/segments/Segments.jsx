import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { Panel } from 'q3-components';
import { Definitions } from '../state';
import { useActiveFilter } from '../../hooks';
import SegmentName from '../../components/SegmentName';
import SegmentAdd from '../../components/SegmentAdd';
import SegmentDropdownMenu from '../../components/SegmentDropdownMenu';
import SegmentListItem from '../../components/SegmentListItem';

const getSearchValues = (a) =>
  a.map((item) => item.searchValue);

const Segements = ({ children }) => {
  const { location } = React.useContext(Definitions);
  const {
    add,
    modify,
    remove,
    filters,
    favourite,
    main,
  } = useActiveFilter(location.search);

  const listItems = [
    {
      label: 'All',
      searchValue: '?active',
    },
    ...filters,
  ];

  return (
    <Panel title="Segments">
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
          <SegmentAdd onSave={add} />
        </List>
      </Box>
    </Panel>
  );
};

Segements.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Segements;
