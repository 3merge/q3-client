import React from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import List, { ActionBar, ListItem } from '.';

export default {
  title: 'Q3 UI|Components/List',
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
      renderListItemProps={() => ({
        primary: <a href="/">Overwritten via props</a>,
      })}
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

export const AsEmpty = () => (
  <Container>
    <Paper>
      <List
        onCreate={() => null}
        title="For demonstration"
      />
    </Paper>
  </Container>
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
