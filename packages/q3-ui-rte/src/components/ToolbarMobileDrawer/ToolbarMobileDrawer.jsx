import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Grid,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import { useToggle } from 'useful-state';
import { MoreVert } from '@material-ui/icons';
import { map, compact } from 'lodash';
import { useTranslation } from 'react-i18next';

const ToolbarMobileDrawer = ({ options }) => {
  const { t } = useTranslation('labels');
  const { state, toggle, close } = useToggle();

  return (
    <Grid item>
      <Hidden mdUp implementation="css">
        <IconButton
          aria-label={t('formatters')}
          onClick={toggle}
        >
          <MoreVert />
        </IconButton>
        <Drawer
          anchor="bottom"
          open={state}
          onClose={close}
          keepMounted
          disablePortal
        >
          <List component="div">
            {map(
              compact(options),
              ({
                component: Component,
                icon,
                label,
                quillKey,
                value,
                ...rest
              }) => {
                const key =
                  label ||
                  t(compact([quillKey, value]).join('-'));

                const renderListIcon = (Icon) =>
                  Icon ? (
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                  ) : null;

                const render = (props = {}) => (
                  <ListItem
                    button
                    component="button"
                    className={`ql-${quillKey}`}
                    key={key}
                    value={value}
                    {...props}
                  >
                    {renderListIcon(icon)}
                    {renderListIcon(props?.icon)}
                    <ListItemText primary={key} />
                  </ListItem>
                );

                return Component ? (
                  <Component component={render} {...rest} />
                ) : (
                  render()
                );
              },
            )}
          </List>
        </Drawer>
      </Hidden>
    </Grid>
  );
};

ToolbarMobileDrawer.propTypes = {
  options: PropTypes.arrayOf({}).isRequired,
};

export default ToolbarMobileDrawer;
