import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Dialog from 'q3-ui-dialog';
import { array } from 'q3-ui-helpers';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { State } from 'q3-ui-exports';
import { withLocation } from 'with-location';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import FileUpload from '../../components/FileUpload';
import ActionList from '../../components/ActionList';
import useIo from '../../hooks/useIo';

const TableIo = ({ io, data, params }) => {
  const exportState = React.useContext(State);
  const checked = get(exportState, 'checked', []);

  const gt = React.useCallback(
    (v) => array.hasLength(v) > 0,
    [],
  );

  const ex = get(io, 'exports', []);
  const im = get(io, 'imports', []);
  const renderer = get(io, 'renderer', null);

  const hasExports = gt(ex);
  const hasImports = gt(im);

  const { exportCollection, importCollection } = useIo(
    checked,
    params,
  );

  return (
    <Dialog
      title="settings"
      variant="drawer"
      renderContent={() =>
        io ? (
          <Box>
            <ActionList actionTitle="imports" actions={im}>
              {(templateName) => (
                <FileUpload
                  label="import"
                  icon={CloudUpload}
                  done={importCollection(templateName)}
                />
              )}
            </ActionList>
            <ActionList actionTitle="exports" actions={ex}>
              {(templateName) => (
                <IconButton
                  label="export"
                  icon={CloudDownload}
                  buttonProps={{
                    onClick: exportCollection(templateName),
                  }}
                />
              )}
            </ActionList>
            {renderer
              ? renderer({
                  data,
                  checked,
                })
              : null}
          </Box>
        ) : null
      }
      renderTrigger={(onClick) =>
        hasExports || hasImports ? (
          <ButtonWithIcon
            variant="contained"
            onClick={onClick}
            icon={ImportExportIcon}
            label={
              checked.length > 0
                ? `i/o  (${checked.length})`
                : 'i/o'
            }
          />
        ) : null
      }
    />
  );
};

TableIo.defaultProps = {
  io: null,
};

TableIo.propTypes = {
  io: PropTypes.shape({
    exports: PropTypes.array,
    imports: PropTypes.array,
  }),
};

export default withLocation(TableIo);
