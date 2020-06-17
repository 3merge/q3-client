import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

export const usePreviousRef = (value, onClear) => {
  const ref = React.useRef();
  const isModified = ref.current
    ? JSON.stringify(ref.current) !== JSON.stringify(value)
    : false;

  const clear = () => {
    ref.current = value;
    if (onClear) onClear();
  };

  React.useEffect(() => {
    clear();
    return () => {
      clear();
    };
  }, []);

  return {
    prev: ref.current,
    isModified,
    clear,
  };
};

export default (value, showSnack) => {
  const { t } = useTranslation('labels');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ref = React.useRef();

  const teardown = () => {
    if (ref.current) closeSnackbar(ref.current);
  };

  const out = usePreviousRef(value, () => {
    teardown();
  });

  const { isModified } = out;

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (isModified && showSnack)
        ref.current = enqueueSnackbar(
          t('unsavedChangesOn'),
          {
            persist: true,
            variant: 'warning',
          },
        );
    }, [250]);

    return () => {
      clearTimeout(timer);
    };
  }, [isModified]);

  React.useLayoutEffect(() => {
    if (!isModified) teardown();
  });

  return out;
};
