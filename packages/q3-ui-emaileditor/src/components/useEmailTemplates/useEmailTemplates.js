import React from 'react';
import { get, find, size } from 'lodash';
import useRest from 'q3-ui-rest';

export const isPartial = (xs) =>
  !xs?.name || String(xs.name).startsWith('__');

export const findById = (xs, id) =>
  find(xs, (item) => item?.id === id);

export const getFirstFullTemplateId = (xs) =>
  find(xs, (item) => !isPartial(item))?.id;

const useEmailTemplates = () => {
  const {
    emails = [],
    fetchingError = false,
    fetching = true,
    patch,
  } = useRest({
    key: 'email',
    pluralized: 'emails',
    url: '/emails',
    runOnInit: true,
    location: {
      search: '?sort=name',
    },
  });

  const [active, setActive] = React.useState();
  const current = findById(emails, active);

  const handleSave = (mjml) =>
    patch(active)({
      mjml,
    });

  React.useEffect(() => {
    if (size(emails) && !active)
      setActive(getFirstFullTemplateId(emails));
  }, [emails]);

  return {
    templates: emails,
    error: Boolean(fetchingError && !size(emails)),
    ready: Boolean(!fetching && current) || fetchingError,
    disablePreview: isPartial(current),
    value: get(current, 'mjml', '<mjml />'),
    vars: get(current, 'variables', {}),
    onSave: handleSave,
    setById: setActive,
    id: active,
  };
};

export default useEmailTemplates;
