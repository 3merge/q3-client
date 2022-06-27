import React from 'react';
import PropTypes from 'prop-types';
import { get, map, size } from 'lodash';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { State } from 'q3-ui-exports';
import { withLocation } from 'with-location';
import ButtonWithIcon from '../ButtonWithIcon';
import DropdownMenu from '../DropdownMenu';
import useIo from '../../hooks/useIo';

const ActionBarExport = ({
  exports: exportOptions,
  // eslint-disable-next-line
  params,
}) => {
  const exportState = React.useContext(State);
  const { exportCollection } = useIo(
    get(exportState, 'checked', []),
    params,
  );

  return size(exportOptions) ? (
    <DropdownMenu
      items={map(exportOptions, (action) => ({
        label: action,
        onClick: exportCollection(action),
      }))}
    >
      {(onClick) => (
        <ButtonWithIcon
          icon={CloudDownload}
          label="export"
          onClick={onClick}
          transparent
        />
      )}
    </DropdownMenu>
  ) : null;
};

ActionBarExport.defaultProps = {
  exports: [],
};

ActionBarExport.propTypes = {
  exports: PropTypes.arrayOf(PropTypes.string),
};

export default withLocation(ActionBarExport);
