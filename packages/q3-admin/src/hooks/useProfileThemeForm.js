import React from 'react';
import { first } from 'lodash';
import useProfileForm from './useProfileForm';
import { DARK, LIGHT } from './useProfileTheme';

const useProfileThemeForm = () => {
  const { initialValues, onSubmit } = useProfileForm();
  const theme = initialValues?.theme || LIGHT;
  const themeOptions = [DARK, LIGHT];

  const eq = (xs) => theme === xs;
  const themeNext = React.useMemo(
    () => first(themeOptions.filter((item) => !eq(item))),
    [theme],
  );

  return {
    theme,
    themeNext,
    themeOptions,
    isDark: eq(DARK),
    isLight: eq(LIGHT),
    change: () =>
      onSubmit({
        theme: themeNext,
      }),
    onSubmit,
  };
};

export default useProfileThemeForm;
