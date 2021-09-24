import React from 'react';
import { get, find, size } from 'lodash';
import useRest from 'q3-ui-rest';
import { useAuth } from 'q3-ui-permissions';

export const URL_NAME = 'emails';

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
    pluralized: URL_NAME,
    url: `/${URL_NAME}`,
    runOnInit: true,
    location: {
      search: '?sort=name',
    },
  });

  const { canSee } = useAuth(URL_NAME);
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
    error: Boolean(
      fetchingError || !size(emails) || !canSee,
    ),
    ready: Boolean(!fetching && current) || fetchingError,
    disablePreview: isPartial(current),
    value: current?.mjml || '<mjml />',
    variables: get(current, 'variables', {}),
    onSave: handleSave,
    setById: setActive,
    id: active,
  };
};

export default useEmailTemplates;
