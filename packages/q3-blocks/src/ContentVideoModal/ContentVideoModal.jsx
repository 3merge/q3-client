import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Tooltip from 'q3-ui/lib/tooltip';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {
    height: 0,
    padding: '25%',
    position: 'relative',
    width: '100%',
  },
  img: {
    height: '100%',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  trigger: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));

const Iframe = ({ title, url }) => {
  const [open, setOpen] = React.useState();
  const { root, img, trigger } = useStyles();
  const { t } = useTranslation();

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (
    match &&
    match[2].length === 11 && (
      <Container maxWidth="md" textAlign="center">
        <Paper className={root}>
          <img
            className={img}
            src={`https://img.youtube.com/vi/${match[2]}/0.jpg`}
            alt={title}
          />
          <Tooltip title={t('labels:watch')} arrow>
            <Fab
              className={trigger}
              color="primary"
              onClick={() => setOpen(true)}
              size="lg"
            >
              <VideoLibrary />
            </Fab>
          </Tooltip>
          <Dialog
            onClose={() => setOpen(false)}
            aria-labelledby="simple-dialog-title"
            maxWidth="md"
            fullWidth
            open={open}
          >
            <iframe
              src={`//www.youtube.com/embed/${match[2]}`}
              title={title}
              style={{ height: 450 }}
              frameBorder="0"
              allowFullScreen
            />
          </Dialog>
        </Paper>
      </Container>
    )
  );
};

Iframe.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Iframe;
