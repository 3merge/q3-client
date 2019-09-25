import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import { MissingGraphic } from '../../components/graphic';
import Page from '../page';

const useStyles = makeStyles(() => ({
  bg: {
    background: grey[200],
  },
  foreground: {
    filter: 'initial',
    mixBlendMode: 'multiply',
    maxWidth: 500,
  },
}));

export default () => {
  const { foreground, bg } = useStyles();
  const { t } = useTranslation();
  const title = t('titles:notFound');
  return (
    <Page title={title} showSearch={false}>
      <Box className={bg} textAlign="center">
        <MissingGraphic className={foreground} />
      </Box>
    </Page>
  );
};
