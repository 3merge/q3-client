import { isFunction, get, size } from 'lodash';

const useDataTable = (originalProps = {}) => {
  const hasSize = (key) =>
    size(get(originalProps, key, [])) > 0;

  const checkForMultiselectActions = () =>
    isFunction(get(originalProps, 'onRemove')) ||
    hasSize('exportOptions') ||
    hasSize('moreOptions');

  const shouldRenderTools = () =>
    checkForMultiselectActions() || hasSize('moreOptions');

  return {
    checkForMultiselectActions,
    shouldRenderTools,
  };
};

export default useDataTable;
