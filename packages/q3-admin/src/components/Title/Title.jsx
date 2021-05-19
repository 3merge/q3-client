import React from 'react';
import { useLocation } from '@reach/router';
import { compact, first, filter } from 'lodash';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyle from './styles';

const notKnownRoot = (xs) => !['admin', 'app'].includes(xs);

const Title = () => {
  const { t } = useTranslation('titles');

  const collection = first(
    filter(
      compact(String(useLocation().pathname).split('/')),
      notKnownRoot,
    ),
  );

  return (
    <Typography color="inherit" classes={useStyle()}>
      {t(collection)}
    </Typography>
  );
};

export default Title;
