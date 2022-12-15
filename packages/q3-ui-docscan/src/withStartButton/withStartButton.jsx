import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Avatar,
  Dialog,
  Fab,
} from '@material-ui/core';
import ScannerIcon from '@material-ui/icons/Scanner';
import { useTranslation } from 'q3-ui-locale';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ErrorBoundary from '../ErrorBoundary';

const withStartButton = (Component) => (props) => {
  const [start, setStart] = React.useState(false);
  const { t } = useTranslation();

  return start ? (
    <ErrorBoundary
      onError={() => {
        alert('SOMETHING WENT WRONG');
        setStart(null);
      }}
    >
      <Dialog fullScreen open>
        <Component {...props} />
        <Fab
          size="small"
          color="primary"
          onClick={() => {
            setStart(false);
          }}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            zIndex: 10,
          }}
        >
          <KeyboardBackspaceIcon />
        </Fab>
      </Dialog>
    </ErrorBoundary>
  ) : (
    <Card>
      <CardActionArea onClick={() => setStart(true)}>
        <Box
          bgcolor="secondary.main"
          color="secondary.contrastText"
          p={2}
          textAlign="center"
        >
          <Avatar
            style={{
              background: 'transparent',
              color: 'inherit',
              margin: '0 auto',
              border: '1px dotted',
              width: 48,
              height: 48,
              marginBottom: '1rem',
            }}
          >
            <ScannerIcon />
          </Avatar>
          <Typography
            color="inherit"
            variant="h6"
            component="p"
          >
            {t('titles:scanDocument')}
          </Typography>
          <Typography color="inherit" component="p">
            {t('descriptions:scanDocument')}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default withStartButton;
