import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { array } from 'q3-ui-helpers';
import { useTranslation } from 'react-i18next';
import ListSubheader from '@material-ui/core/ListSubheader';

const ListImport = ({ actions, actionTitle, children }) => {
  const { t } = useTranslation();

  return (
    array.hasLength(actions) > 0 && (
      <Box mb={1}>
        <List>
          <ListSubheader disableSticky color="primary">
            {t(`titles:${actionTitle}`)}
          </ListSubheader>
          {actions.map((i, index) => (
            <React.Fragment key={i}>
              <ListItem key={i}>
                <ListItemText
                  primary={t(`labels:${i}`)}
                  secondary={t(`descriptions:${i}`)}
                />
                <ListItemSecondaryAction>
                  {children(i)}
                </ListItemSecondaryAction>
              </ListItem>
              {index !== actions.length - 1 && (
                <Divider inset="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    )
  );
};

ListImport.defaultProps = {
  actions: [],
};

ListImport.propTypes = {
  /**
   * Populates the action list entries.
   */
  actions: PropTypes.arrayOf(PropTypes.string),

  /**
   * Populates the list subtitle component.
   */
  actionTitle: PropTypes.string.isRequired,

  /**
   * Renderer function that receives the action name.
   */
  children: PropTypes.func.isRequired,
};

export default ListImport;
