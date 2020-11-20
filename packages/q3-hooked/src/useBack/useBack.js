import React from 'react';
import {
  Link,
  useNavigate,
  useLocation,
} from '@reach/router';
import { useTranslation } from 'react-i18next';
import { Definitions } from '../context';

export default () => {
  const {
    directoryPath = '/',
    resourceName,
  } = React.useContext(Definitions);
  const { t } = useTranslation('labels');
  const navigate = useNavigate();
  const router = useLocation();
  const state = {};

  let to = router?.state?.prev;

  if (typeof to === 'string' && !to.includes(resourceName))
    to = undefined;

  to ||= directoryPath;

  return {
    label: t('returnTo', { resourceName }),
    onClick: () =>
      navigate(to, {
        state,
      }),

    renderer: (props) =>
      React.createElement(Link, {
        ...props,
        state,
        to,
      }),
  };
};
