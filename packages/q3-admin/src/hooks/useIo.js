import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'q3-ui-locale';
import { url } from 'q3-ui-helpers';

export default (ids, ...rest) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('descriptions');

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

  const exportCollection = (template) => () =>
    handleRequest(
      axios.post(`/io${getQueryString(template, ...rest)}`),
      'exportStarted',
      'exportFailed',
    );

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
