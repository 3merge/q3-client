import React from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export default (isModified, show) => {
  const { t } = useTranslation('labels');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ref = React.useRef();

  const teardown = () => {
    if (ref.current) closeSnackbar(ref.current);
  };

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (isModified && show)
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
      teardown();
    };
  }, [isModified, show]);

  React.useLayoutEffect(() => {
    if (!isModified) teardown();
  });
};
