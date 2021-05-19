import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Link } from '@reach/router';
import Drawer from 'q3-ui-dialog';
import DocsIcon from 'q3-ui-assets/lib/SvgIcons/DocsIcon';
import WhatsNew from 'q3-ui-assets/lib/SvgIcons/WhatsNew';
import NavigationListItem from '../NavigationListItem';

const MobileMenu = ({ children, logoSrc, menuItems }) => {
  return (
    <>
      <Typography variant="overline">pages</Typography>
      <NavigationListItem items={menuItems} />
      <Typography variant="overline">apps</Typography>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText
            primary="OET"
            secondary="Business automation"
          />
        </ListItem>
        <ListItem button component={Link} to="docs">
          <ListItemText
            primary="Documentation"
            secondary="Control the docs"
          />
        </ListItem>
        <Drawer
          title="Gentek"
          closeOnRouteChange
          variant="drawer"
          anchor="left"
          style={{ width: 325 }}
          renderContent={() =>
            'OUR LATEST RELEASE NOTES...'
          }
          renderTrigger={(onClick) => (
            <ListItem button onClick={onClick}>
              <ListItemText
                primary="What's New?"
                secondary="See what we've been up to"
              />
            </ListItem>
          )}
        />
      </List>
      <Typography variant="overline">account</Typography>
      ACTION OPTIONS...
    </>
  );
};

export default MobileMenu;
