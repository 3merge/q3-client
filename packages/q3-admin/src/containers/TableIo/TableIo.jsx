import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Dialog from 'q3-ui-dialog';
import { array } from 'q3-ui-helpers';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import FileUpload from '../../components/FileUpload';
import ActionList from '../../components/ActionList';

const TableIo = ({ io }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('descriptions');

  const gt = React.useCallback(
    (v) => array.hasLength(v) > 0,
    [],
  );

  const ex = get(io, 'exports', []);
  const im = get(io, 'imports', []);

  const hasExports = gt(ex);
  const hasImports = gt(im);

  const exportCollection = (template) => () =>
    axios
      .post(`/exports?template=${template}`)
      .then(() =>
        enqueueSnackbar(t('exportStarted'), {
          variant: 'info',
        }),
      )
      .catch(() =>
        enqueueSnackbar(t('exportFailed'), {
          variant: 'error',
        }),
      );

  const importCollection = (template) => ([f]) =>
    axios.post(`/imports?template=${template}`).then(() => {
      const data = new FormData();

      data.append('import', f.src.file);
      return axios
        .post(`/imports?template=${template}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() =>
          enqueueSnackbar(t('importStarted'), {
            variant: 'info',
          }),
        )
        .catch(() =>
          enqueueSnackbar(t('importFailed'), {
            variant: 'error',
          }),
        );
    });

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
                  label="export"
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
          </Box>
        ) : null
      }
      renderTrigger={(onClick) => (
        <ButtonWithIcon
          variant="contained"
          disabled={!hasExports && !hasImports}
          onClick={onClick}
          icon={ImportExportIcon}
          label="i/o"
        />
      )}
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

export default TableIo;
