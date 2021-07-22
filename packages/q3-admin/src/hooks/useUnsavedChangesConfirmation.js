import React from 'react';
import { browser } from 'q3-ui-helpers';
import { get, invoke } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getAttribute } from './useUnsavedChangesBodyAttribute';

const hasTarget = (e) =>
  e.target && getAttribute() && Array.isArray(e.path);

const eventHandlerAdapter = (
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

const includesNavigationElement = (xs) => {
  const role = invoke(xs, 'getAttribute', 'role');
  const tag = get(xs, 'tagName');

  return (
    ['tab', 'link', 'menuitem'].includes(role) ||
    ['A'].includes(tag)
  );
};

const useUnsavedChangesConfirmation = () => {
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

export default useUnsavedChangesConfirmation;
