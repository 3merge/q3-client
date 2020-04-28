import React from 'react';
import { Link } from '@reach/router';
import IconButton from 'q3-ui/lib/iconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { Definitions } from '../state';
import { useReferrer } from '../use';

const Back = () => {
  const { t } = useTranslation('labels');
  const { directoryPath, resourceName } = React.useContext(
    Definitions,
  );
  const path = useReferrer(directoryPath).getPath();

  return (
    <IconButton
      label={t('goBackToCollection', { resourceName })}
      icon={KeyboardBackspace}
      buttonProps={{
        component: Link,
        to: path,
      }}
    />
  );
};

export default Back;
