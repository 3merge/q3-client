import React from 'react';
import { get, map, size } from 'lodash';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { State } from 'q3-ui-exports';
import { withLocation } from 'with-location';
import ButtonWithIcon from '../ButtonWithIcon';
import DropdownMenu from '../DropdownMenu';
import { Definitions } from '../../containers/state';
import useIo from '../../hooks/useIo';

const ActionBarExport = ({
  // eslint-disable-next-line
  params,
}) => {
  const exportState = React.useContext(State);
  const { exportCollection } = useIo(
    get(exportState, 'checked', []),
    params,
  );

  const exportOptions = get(
    React.useContext(Definitions),
    'io.exports',
    [],
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

ActionBarExport.defaultProps = {};
ActionBarExport.propTypes = {};

export default withLocation(ActionBarExport);
