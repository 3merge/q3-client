/* eslint-disable no-param-reassign */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from 'q3-ui-dialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  desktopOffset: {
    marginLeft: 105,
    zIndex: 1000000000,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  saddle: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: '35%',
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
  const { desktopOffset, saddle } = useStyles();
  const { t } = useTranslation('titles');

  return (
    <Dialog
      fullScreen
      title={t(title)}
      className={desktopOffset}
      contentClassName={saddle}
      renderTrigger={renderTrigger}
      renderContent={children}
    />
  );
};
