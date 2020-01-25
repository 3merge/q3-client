import React from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import IconButton from '@material-ui/core/IconButton';
import List, { ActionBar, ListItem } from '.';

export default {
  title: 'Components/List',
  parameters: {
    component: List,
    componentSubtitle:
      'Stylized unordered list component with optional interactivity',
  },
};

export const ListComplete = () => (
  <List title="Completely populated list">
    <ListItem
      title="First entry"
      description={['A', 'B', 'C']}
      icon={AccountBox}
    >
      <ActionBar>
        <IconButton>
          <AccountBox />
        </IconButton>
      </ActionBar>
    </ListItem>
    <ListItem
      title="Second entry"
      description={['D', 'E', 'F']}
      icon={AccountBox}
    >
      <ActionBar
        actions={[
          {
            onClick: () => null,
            label: 'Click me',
          },
        ]}
      >
        <IconButton>
          <AccountBox />
        </IconButton>
      </ActionBar>
    </ListItem>
  </List>
);

export const Empty = () => (
  <List title="Waiting for action!" />
);

export const WithTitle = () => (
  <List title="For demonstration" />
);

export const WithoutActions = () => <p>Hi</p>;
export const WithActions = () => <p>Hi</p>;
export const WithSearch = () => <p>Hi</p>;
