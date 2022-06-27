import React from 'react';
import PropTypes from 'prop-types';
import { get, map, size } from 'lodash';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { State } from 'q3-ui-exports';
import { withLocation } from 'with-location';
import ButtonWithIcon from '../ButtonWithIcon';
import DropdownMenu from '../DropdownMenu';
import FileUpload from '../FileUpload';
import useIo from '../../hooks/useIo';

const ActionBarImport = ({
  imports: importOptions,
  // eslint-disable-next-line
  params,
}) => {
  const [
    currentImportSelection,
    setCurrentImportSelection,
  ] = React.useState();
  const exportState = React.useContext(State);
  const ref = React.useRef();

  const { importCollection } = useIo(
    get(exportState, 'checked', []),
    params,
  );

  const handleUploads = React.useCallback(
    (files) =>
      importCollection(currentImportSelection)(files),
    [currentImportSelection],
  );

  const renderTrigger = React.useCallback(
    (onClick) => (
      // eslint-disable-next-line
      <span
        aria-label="import"
        onClick={onClick}
        ref={ref}
        role="button"
        style={{
          display: 'none',
        }}
      />
    ),
    [],
  );

  return size(importOptions) ? (
    <>
      <FileUpload
        component={renderTrigger}
        done={handleUploads}
      />
      <DropdownMenu
        items={map(importOptions, (action) => ({
          label: action,
          onClick: () => {
            setCurrentImportSelection(action);
            ref.current.click();
          },
        }))}
      >
        {(onClick) => (
          <ButtonWithIcon
            icon={CloudUpload}
            label="import"
            onClick={onClick}
            transparent
          />
        )}
      </DropdownMenu>
    </>
  ) : null;
};

ActionBarImport.defaultProps = {
  imports: [],
};

ActionBarImport.propTypes = {
  imports: PropTypes.arrayOf(PropTypes.string),
};

export default withLocation(ActionBarImport);
