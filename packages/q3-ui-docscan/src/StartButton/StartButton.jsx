import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Avatar,
} from '@material-ui/core';
import ScannerIcon from '@material-ui/icons/Scanner';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

const StartButton = ({ onClick }) => {
  const { t } = useTranslation();
  const cls = useStyle();

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <Box
          bgcolor="secondary.main"
          color="secondary.contrastText"
          p={2}
          textAlign="center"
        >
          <Avatar className={cls.avatar}>
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

StartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StartButton;
