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
      id="1"
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
      id="2"
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

export const WithTitle = () => (
  <List title="For demonstration" />
);

export const WithoutActions = () => (
  <List title="Completely populated list">
    <ListItem
      id="1"
      title="First entry"
      description={['A', 'B', 'C']}
      icon={AccountBox}
    />
  </List>
);

export const WithActions = () => (
  <List title="Completely populated list">
    <ListItem
      id="1"
      title="First entry"
      description={['A', 'B', 'C']}
      icon={AccountBox}
    >
      <ActionBar
        actions={[
          { label: 'Click me!', onClick: () => null },
        ]}
      >
        <IconButton>
          <AccountBox />
        </IconButton>
      </ActionBar>
    </ListItem>
  </List>
);

export const WithoutSearch = () => (
  <List enableSearch={false} title="No search abilities">
    <ListItem
      id="1"
      title="First entry"
      description={['A', 'B', 'C']}
      icon={AccountBox}
    />
  </List>
);
