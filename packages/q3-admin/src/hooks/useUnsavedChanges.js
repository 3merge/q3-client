import React from 'react';
import { browser } from 'q3-ui-helpers';
import { get, invoke } from 'lodash';
import { useTranslation } from 'react-i18next';

const getAttribute = () =>
  browser.proxySessionStorageApi(
    'getItem',
    'q3-change-detection',
  ) === 'true';

export const hasTarget = (e) =>
  Boolean(
    e?.target &&
      Array.isArray(e.path) &&
      e.path.length &&
      getAttribute(),
  );

export const eventHandlerAdapter = (
  element,
  eventName,
  eventHandler,
  options = {},
) => {
  const invokeOn = (method) => () =>
    invoke(
      element,
      method,
      eventName,
      eventHandler,
      options?.useCapture || false,
    );

  return {
    add: invokeOn('addEventListener'),
    remove: invokeOn('removeEventListener'),
  };
};

export const includesNavigationElement = (xs) => {
  const role = invoke(xs, 'getAttribute', 'role');
  const tag = get(xs, 'tagName');
  const insideRte = invoke(
    xs,
    'closest',
    '.q3-forms-rte-wrapper',
  );

  return (
    (['tab', 'link', 'menuitem'].includes(role) ||
      ['A'].includes(tag)) &&
    !insideRte
  );
};

const useUnsavedChanges = () => {
  const { t } = useTranslation('descriptions');

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return undefined;

    const dh = eventHandlerAdapter(
      document,
      'click',
      (e) =>
        hasTarget(e)
          ? e.path.every((target) => {
              if (includesNavigationElement(target)) {
                // eslint-disable-next-line
                if (!confirm(t('unsavedChangesView'))) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                }

                return false;
              }

              return true;
            })
          : true,
      {
        useCapture: true,
      },
    );

    const wh = eventHandlerAdapter(
      window,
      'beforeunload',
      (e) => {
        if (getAttribute()) {
          e.preventDefault();
          e.returnValue = t('unsavedChangesPage');
        }

        return e.returnValue;
      },
    );

    dh.add();
    wh.add();

    return () => {
      dh.remove();
      wh.remove();
    };
  }, []);
};

export default useUnsavedChanges;
