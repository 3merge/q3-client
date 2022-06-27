import axios from 'axios';
import React from 'react';
import { size } from 'lodash';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'q3-ui-locale';
import { url } from 'q3-ui-helpers';
import { Store } from '../containers/state';

export default (ids, ...rest) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('descriptions');
  const { total } = React.useContext(Store);

  const getQueryString = (template, urlParams) => {
    if (!(urlParams instanceof URLSearchParams))
      return ids
        ? `?template=${template}&ids=${ids}`
        : `?template=${template}`;

    urlParams.delete('limit');
    urlParams.delete('page');
    urlParams.delete('sort');

    if (template) urlParams.set('template', template);
    if (ids) urlParams.set('ids', ids);
    return `?${url.toParamsString(urlParams)}`;
  };

  const handleRequest = (req, onSuccessMsg, onFailMsg) =>
    req
      .then(() =>
        enqueueSnackbar(t(onSuccessMsg), {
          variant: 'info',
          preventDuplicate: false,
        }),
      )
      .catch(() =>
        enqueueSnackbar(t(onFailMsg), {
          variant: 'error',
          preventDuplicate: false,
        }),
      );

  const exportCollection = (template) => () => {
    let exit;

    if (!ids || !size(ids)) {
      if (total > 3500) {
        if (
          // eslint-disable-next-line
          !confirm(
            'The number of rows in this export exceeds 3500. The server might limit the returned  results to reduce the file size. If you want to ensure all records export, apply (additional) filters or make a selection.',
          )
        )
          exit = true;
      } else if (
        // eslint-disable-next-line
        !confirm(
          'No rows selected. Proceeding will export all or any records matching the applied filters.',
        )
      ) {
        exit = true;
      }
    }

    return exit
      ? Promise.resolve()
      : handleRequest(
          axios.post(
            `/io${getQueryString(template, ...rest)}`,
          ),
          'exportStarted',
          'exportFailed',
        );
  };

  const importCollection = (template) => (data) =>
    handleRequest(
      new Promise((resolve, reject) => {
        try {
          const [f] = data;
          const formData = new FormData();
          formData.append('import', f.src.file);

          axios
            .post(
              `/io${getQueryString(template)}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
            .then(resolve)
            .catch(reject);
        } catch (e) {
          // eslint-disable-next-line
          console.warn('Could not perform import:', e);
          reject(e);
        }
      }),
      'importStarted',
      'importFailed',
    );

  return {
    exportCollection,
    importCollection,
  };
};
