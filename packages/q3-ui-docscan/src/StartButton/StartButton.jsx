import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Avatar,
} from '@material-ui/core';
import ScannerIcon from '@material-ui/icons/Scanner';
import { useTranslation } from 'q3-ui-locale';

const StartButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardActionArea onClick={onClick}>
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

export default StartButton;
