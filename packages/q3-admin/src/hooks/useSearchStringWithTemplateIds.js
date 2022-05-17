import { useLocation } from '@reach/router';
import { url } from 'q3-ui-helpers';
import { size } from 'lodash';

const useSearchStringWithTemplateIds = () => {
  const urlParamsInstance = new URLSearchParams(
    useLocation()?.search,
  );

  return {
    clean() {
      ['limit', 'page', 'sort'].forEach((key) => {
        urlParamsInstance.delete(key);
      });

      return this;
    },

    output() {
      return `?${url.toParamsString(urlParamsInstance)}`;
    },

    setIds(ids) {
      if (size(ids)) urlParamsInstance.set('ids', ids);
      return this;
    },

    setTemplateName(template) {
      if (template)
        urlParamsInstance.set('template', template);

      return this;
    },
  };
};

export default useSearchStringWithTemplateIds;
