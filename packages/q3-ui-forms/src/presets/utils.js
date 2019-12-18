import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useNewPassword = () => {
  const { t } = useTranslation();

  return yup
    .string()
    .min(8)
    .max(16)
    .matches(/([a-z])+/, {
      message: t('helpers:lowercase'),
    })
    .matches(/([A-Z])+/, {
      message: t('helpers:uppercase'),
    })
    .matches(/([0-9])+/, {
      message: t('helpers:numbers'),
    })
    .matches(/([!@#$%^&*(),.?":{}|<>])+/, {
      message: t('helpers:special'),
    })
    .required();
};

export const useConfirmPassword = () => {
  const { t } = useTranslation();

  return yup
    .string()
    .oneOf(
      [yup.ref('newPassword'), null],
      t('helpers:noMatch'),
    )
    .required();
};
