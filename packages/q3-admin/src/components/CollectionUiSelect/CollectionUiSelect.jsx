import React from 'react';
import PropTypes from 'prop-types';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import { find, size } from 'lodash';
import StorageIcon from '@material-ui/icons/Storage';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DropdownMenu from '../DropdownMenu';
import ButtonWithIcon from '../ButtonWithIcon';

const getIcon = (ui) =>
  ({
    calendar: CalendarTodayIcon,
    table: StorageIcon,
  }[ui] || ViewQuiltIcon);

const CollectionUiSelect = ({ uis }) =>
  size(uis) > 0 && (
    <DropdownMenu items={uis}>
      {(onClick) => {
        const active = find(uis, (ui) => ui.selected);
        const icon = active?.icon || getIcon(active?.label);

        return (
          <ButtonWithIcon
            icon={icon}
            label="uis"
            onClick={onClick}
          />
        );
      }}
    </DropdownMenu>
  );

CollectionUiSelect.defaultProps = {
  uis: [],
};

CollectionUiSelect.propTypes = {
  uis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default CollectionUiSelect;
