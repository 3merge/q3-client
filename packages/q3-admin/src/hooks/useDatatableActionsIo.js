import axios from 'axios';
import { last, map, lowerCase } from 'lodash';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'q3-ui-locale';
import useSearchStringWithTemplateIds from './useSearchStringWithTemplateIds';

const useDatatableActionsIo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('descriptions');
  const searchString = useSearchStringWithTemplateIds();

  const invokeSnackbar =
    (str = 'ok') =>
    () => {
      const variant =
        last(
          map(String(str).match(/[A-Z][a-z]+/g), lowerCase),
        ) || 'info';

      enqueueSnackbar(t(str), {
        preventDuplicate: false,
        variant,
      });
    };

  const makeQueryString = (template, ids = []) =>
    `/io${searchString
      .clean()
      .setTemplateName(template)
      .setIds(ids)
      .output()}`;

  return {
    exportCollection: (template, ids = []) =>
      axios
        .post(makeQueryString(template, ids))
        .then(invokeSnackbar('exportSuccess'))
        .catch(invokeSnackbar('exportError')),

    importCollection: (template, formData) =>
      axios
        .post(makeQueryString(template), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(invokeSnackbar('importSuccess'))
        .catch(invokeSnackbar('importError')),
  };
};

export default useDatatableActionsIo;
