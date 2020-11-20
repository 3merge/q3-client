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
} from '@material-ui/core';
import Image from 'gatsby-image';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DuoIcon from '@material-ui/icons/Duo';
import * as Toolbar from '../../Toolbar';

const Hero = () => {
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
    <Box mb={2} mt={4}>
      <Container component="header" maxWidth="xl">
        <Box textAlign="center">
          <Avatar
            style={{ dislpay: 'block', margin: '0 auto' }}
          />
          <Typography variant="h1">{title}</Typography>
        </Box>
        <List
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MuiListItem style={{ width: 'auto' }}>
            <ListItemText
              primary={createdBy}
              secondary="Created b"
              primaryTypographyProps={{
                style: {
                  fontWeight: 'bold',
                },
              }}
            />
          </MuiListItem>
          <MuiListItem style={{ width: 'auto' }}>
            <ListItemText
              primary={updatedBy}
              secondary="Created b"
              primaryTypographyProps={{
                style: {
                  fontWeight: 'bold',
                },
              }}
            />
          </MuiListItem>
        </List>
      </Container>
    </Box>
  );
};

export default Hero;
