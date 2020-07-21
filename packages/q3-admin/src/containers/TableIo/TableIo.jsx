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
import { State } from 'q3-ui-exports';
import { withLocation } from 'with-location';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import FileUpload from '../../components/FileUpload';
import ActionList from '../../components/ActionList';

const TableIo = ({ io, data, params }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('descriptions');
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

  const getQueryString = (template) => {
    params.delete('sort');
    params.delete('page');
    params.delete('limit');
    params.set('template', template);

    if (checked && checked.length)
      params.set('ids', checked.join(','));

    return `?${params.toString()}`;
  };

  const exportCollection = (template) => () =>
    axios
      .post(`/exports${getQueryString(template)}`)
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
    axios
      .post(`/imports${getQueryString(template)}`)
      .then(() => {
        const formData = new FormData();

        formData.append('import', f.src.file);
        return axios
          .post(`/imports?template=${template}`, formData, {
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
      renderTrigger={(onClick) => (
        <ButtonWithIcon
          variant="contained"
          disabled={!hasExports && !hasImports}
          onClick={onClick}
          icon={ImportExportIcon}
          label={
            checked.length > 0
              ? `i/o  (${checked.length})`
              : 'i/o'
          }
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

export default withLocation(TableIo);
