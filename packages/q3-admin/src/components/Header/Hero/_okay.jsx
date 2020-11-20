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

const Hero = () => {
  const {
    collectionName,
    title,
    onClick,
    photo,
  } = useHeader();

  return (
    <Box mb={2} mt={4}>
      <Container component="header" maxWidth="xl">
        <Box textAlign="center">
          <Chip label="Open" />
          <Typography variant="h1">{title}</Typography>
        </Box>
        <List
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MuiListItem style={{ width: 'auto' }}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary="The person's bane"
              secondary="Created b"
            />
          </MuiListItem>
          <MuiListItem style={{ width: 'auto' }}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary="The person's bane"
              secondary="Created b"
            />
          </MuiListItem>
        </List>
      </Container>
    </Box>
  );
};

export default Hero;
