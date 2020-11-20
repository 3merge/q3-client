import React from 'react';
import { useHeader } from 'q3-hooked';
import {
  Box,
  Container,
  Divider,
  Typography,
  Avatar,
  ListItem as MuiListItem,
  ListItemAvatar,
  List,
  ListItemText,
  Grid,
  Chip,
  Paper,
} from '@material-ui/core';
import Image from 'gatsby-image';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DuoIcon from '@material-ui/icons/Duo';
import * as Toolbar from '../../Toolbar';

const Hero = ({ children }) => {
  const {
    collectionName,
    title,
    onClick,
    photo,
    createdBy,
    updatedBy,
    ...rest
  } = useHeader();

  return (
    <>
      <Box
        bgcolor="background.default"
        component="header"
        p={1}
      >
        {children}
        <Box py={3}>
          <Container>
            <Typography variant="h1">{title}</Typography>
          </Container>
        </Box>
        <Box height={220} />
      </Box>
      {photo && (
        <Container>
          <Box mt="-220px">
            <Paper>
              <Image
                aria-hidden
                fluid={{ src: photo }}
                style={{
                  height: 300,
                }}
              />
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Hero;
