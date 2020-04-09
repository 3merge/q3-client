import React from 'react';
import { Link } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { Definitions } from '../state';
import { useReferrer } from '../use';

const Back = () => {
  const { t } = useTranslation('labels');
  const { rootPath, id } = React.useContext(Definitions);
  const path = useReferrer(
    typeof rootPath === 'string'
      ? rootPath.split(id)[0]
      : '/',
  ).getPath();

  return (
    <IconButton
      aria-label={t('goBack')}
      component={Link}
      to={path}
    >
      <KeyboardBackspace />
    </IconButton>
  );
};

export default Back;
