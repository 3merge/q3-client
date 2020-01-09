/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  desktopOffset: {
    marginLeft: 345,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  saddle: {
    paddingRight: '35%',
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
  },
  backBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
}));

export default ({ children, renderTrigger, title }) => {
  const { desktopOffset, backBtn, saddle } = useStyles();
  const { t } = useTranslation('titles');

  return (
    <Dialog
      fullScreen
      className={desktopOffset}
      contentClassName={saddle}
      renderTrigger={renderTrigger}
      renderContent={(close) => (
        <>
          <IconButton
            onClick={close}
            className={backBtn}
            aria-label={t('back')}
          >
            <Close />
          </IconButton>
          <Box py={4}>
            <Typography variant="h2" gutterBottom>
              {t(title)}
            </Typography>
            {children(close)}
          </Box>
        </>
      )}
    />
  );
};
