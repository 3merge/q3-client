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
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              variant="h1"
              style={{ display: 'inline' }}
            >
              {title}
            </Typography>
            <p style={{ display: 'inline' }}>
              Some attribute
            </p>
          </Grid>
          <Grid item>
            <Chip label="Open" />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Divider />
        </Box>
        <List
          style={{
            display: 'flex',
            justifyContent: 'space-between',
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
            <ListItemText secondary="Updated on" />
            <DuoIcon />
          </MuiListItem>
        </List>
      </Container>
    </Box>
  );
};

export default Hero;
