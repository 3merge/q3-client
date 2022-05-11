import React from 'react';
import { get, find, size } from 'lodash';
import useRest from 'q3-ui-rest';
// eslint-disable-next-line
import { useAuth, useProfileLang } from 'q3-ui-permissions';

export const URL_NAME = 'emails';

export const isPartial = (xs) =>
  !xs?.name || String(xs.name).startsWith('__');

export const findById = (xs, id) =>
  find(xs, (item) => item?.id === id);

export const getFirstFullTemplateId = (xs) =>
  find(xs, (item) => !isPartial(item))?.id;

const noop = () => Promise.resolve(null);

export const useLangSearch = () => {
  const lang = useProfileLang();
  return `?sort=name&limit=500&name=in(/^${lang}/gi,/^__class/gi,/^__${lang}/gi)`;
};

const useEmailTemplates = () => {
  const {
    emails = [],
    fetchingError = false,
    fetching = true,
    patch,
    poll,
    remove,
  } = useRest({
    key: 'email',
    pluralized: URL_NAME,
    url: `/${URL_NAME}`,
    runOnInit: true,
    location: {
      search: useLangSearch(),
    },
  });

  const { canSee } = useAuth(URL_NAME);
  const [active, setActive] = React.useState();
  const current = findById(emails, active);

  /**
   * Forcing async because try/catch logic
   * Hadn't previously worked as a promise.
   */
  const handleRevert = async () => {
    try {
      if (
        // eslint-disable-next-line
        confirm(
          'Reverting discards any and all changes made to this email template. This action is irreversible.',
        )
      ) {
        await remove(active)();
        return poll();
      }

      return noop();
    } catch (e) {
      return noop();
    }
  };

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
    onRevert: handleRevert,
    onSave: handleSave,
    setById: setActive,
    id: active,
  };
};

export default useEmailTemplates;
