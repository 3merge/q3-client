import React from 'react';
import {
  ListItem as MuiListItem,
  List,
  ListItemText,
} from '@material-ui/core';

const Inline = ({ justify }) => {
  return (
    <List
      style={{
        display: 'flex',
        justifyContent: justify,
      }}
    >
      <MuiListItem
        style={{
          borderTop: '1px solid',
          width: 'auto',
          margin: '0 .5rem',
        }}
      >
        <ListItemText
          primary="The person's bane"
          secondary="Created b"
        />
      </MuiListItem>
      <MuiListItem
        style={{
          borderTop: '1px solid',
          width: 'auto',
          margin: '0 .5rem',
        }}
      >
        <ListItemText
          primary="The person's bane"
          secondary="Created b"
        />
      </MuiListItem>
    </List>
  );
};

export default Inline;

/**

  primaryTypographyProps={{
                style: {
                  fontWeight: 'bold',
                },
              }} */
