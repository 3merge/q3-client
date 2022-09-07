import React from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@material-ui/core';
import { get } from 'lodash';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ColumnConfigurationContext from '../ColumnConfigurationContext';
import ColumnConfigurationComponent from '../ColumnConfigurationComponent';
import ColumnConfigurationDisplayName from '../ColumnConfigurationDisplayName';
import ColumnConfigurationFormat from '../ColumnConfigurationFormat';
import ColumnConfigurationStyle from '../ColumnConfigurationStyle';

const views = {
  component: ColumnConfigurationComponent,
  displayName: ColumnConfigurationDisplayName,
  format: ColumnConfigurationFormat,
  style: ColumnConfigurationStyle,
};

const ColumnConfiguration = () => {
  const { changeFieldData, fieldData } = React.useContext(
    ColumnConfigurationContext,
  );

  const [view, setView] = React.useState(null);

  const handleBack = () => setView(null);

  const handleViewChange = (viewId) => () => {
    setView(viewId);
  };

  const handleSwitch = (prop) => (_, newValue) =>
    changeFieldData({
      [prop]: newValue,
    });

  const SelectedView = views[view];

  return (
    <Box width={280}>
      {SelectedView ? (
        <>
          <Button onClick={handleBack}>Back</Button>
          <SelectedView />
        </>
      ) : (
        <List>
          <ListItem dense>
            <ListItemText primary="changeDisplayName" />
            <ListItemSecondaryAction>
              <IconButton
                onClick={handleViewChange('displayName')}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemText primary="component" />
            <ListItemSecondaryAction>
              <IconButton
                onClick={handleViewChange('component')}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="format" />
            <ListItemSecondaryAction>
              <IconButton
                onClick={handleViewChange('format')}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemText primary="width" />
            <ListItemSecondaryAction>
              <IconButton
                onClick={handleViewChange('style')}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemText primary="showLabel" />
            <ListItemSecondaryAction>
              <Switch
                checked={get(fieldData, 'showLabel', true)}
                onChange={handleSwitch('showLabel')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemText primary="sortable" />
            <ListItemSecondaryAction>
              <Switch
                checked={get(fieldData, 'sortable', false)}
                onChange={handleSwitch('sortable')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemText primary="sticky" />
            <ListItemSecondaryAction>
              <Switch
                checked={get(fieldData, 'sticky', false)}
                onChange={handleSwitch('sticky')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default ColumnConfiguration;
