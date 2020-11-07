import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { useSegments } from 'q3-hooked';
import SidePanelContent from '../../components/SidePanelContent';
import SegmentName from '../../components/SegmentName';
import SegmentAdd from '../../components/SegmentAdd';
import SegmentDropdownMenu from '../../components/SegmentDropdownMenu';
import SegmentListItem from '../../components/SegmentListItem';

const getSearchValues = (a) =>
  a.map((item) => item.searchValue);

const Segements = ({ children }) => {
  const {
    add,
    modify,
    remove,
    filters,
    favourite,
    main,
  } = useSegments();

  return (
    <SidePanelContent title="Segments">
      <Box id="q3-segments">
        <List style={{ margin: 0, padding: 0 }}>
          {filters.map(
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
                siblings={getSearchValues(filters)}
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
    </SidePanelContent>
  );
};

Segements.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Segements;
