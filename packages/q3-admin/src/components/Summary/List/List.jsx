import React from 'react';
import { Box, Divider, Link } from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DuoIcon from '@material-ui/icons/Duo';

const ListItemChip = ({ children }) => (
  <Link
    style={{
      backgroundColor: 'lightblue',
      fontSize: '.844rem',
      fontWeight: 800,
      padding: '0 .25rem',
      textDecoration: 'none !IMPORTANT',
    }}
  >
    {children}
  </Link>
);

const ListItemLink = ({ children }) => (
  <Link
    style={{
      fontSize: '.844rem',
      fontWeight: 800,
    }}
  >
    {children}
  </Link>
);

const ListItem = ({ children, icon: Icon, label }) => (
  <Box component="li" my={0.75}>
    <Box color="grey.700" component="span" mr={1}>
      <Icon /> {label}
    </Box>
    {children}
  </Box>
);

const Hero = () => {
  return (
    <Box
      component="ul"
      p={0}
      my={2}
      style={{ listStyle: 'none' }}
    >
      <ListItem icon={CalendarTodayIcon} label="Belongs to">
        <ListItemLink>First</ListItemLink>
      </ListItem>
      <ListItem
        icon={DuoIcon}
        label="Relates to this and this"
      >
        <ListItemChip>Open</ListItemChip>
        <ListItemChip>Tech</ListItemChip>
        <ListItemChip>Restricted</ListItemChip>
      </ListItem>
      <ListItem
        icon={ArrowBackIosIcon}
        label="Relates to this and this"
      >
        <ListItemChip>First</ListItemChip>
      </ListItem>
    </Box>
  );
};

export default Hero;
