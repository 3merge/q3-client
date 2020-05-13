import React from 'react';
import { get } from 'lodash';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import Box from '@material-ui/core/Box';
import { AuthContext } from 'q3-ui-permissions';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from 'q3-ui-dialog';
import FiltersAdd from './FiltersAdd';
import { Definitions } from '../state';

import FiltersForm from './FiltersForm';
import FiltersClear from './FiltersClear';
import FiltersName from './FiltersName';
import useActiveFilter from '../useActiveFilter';
import Panel from '../../components/sidebar/panel';

const Groups = ({ children, initialValues }) => {
  const { location } = React.useContext(Definitions);
  const {
    active,
    add,
    modify,
    remove,
    filters,
    favourite,
    main,
    numberApplied,
  } = useActiveFilter(location.search);

  return (
    <Box>
      <Panel title="Segments">
        <Box>
          <List>
            {[
              {
                label: 'All',
                onClick: () => navigate('?active'),
                isActive:
                  !main || active === 'All' || !active,
              },
            ]
              .concat(filters)
              .map(
                ({
                  onClick,
                  value,
                  label,
                  fromProfile,
                  isActive,
                }) => (
                  <ListItem
                    button
                    fullWidth
                    variant="contained"
                    onClick={onClick}
                    key={label}
                    style={{
                      backgroundColor:
                        active === label || isActive
                          ? 'rgba(0,0,0,0.05)'
                          : undefined,
                    }}
                  >
                    <ListItemText primary={label} />
                    <ListItemSecondaryAction>
                      {main === label && (
                        <IconButton disabled size="small">
                          <StarIcon
                            style={{ color: 'orange' }}
                          />
                        </IconButton>
                      )}
                      <Dialog
                        title="Custom segment editor"
                        renderTrigger={(open) => (
                          <DropDownMenu
                            id="q3-segments"
                            items={[
                              {
                                label: 'Mark as default',
                                onClick: () =>
                                  favourite(label),
                              },
                              ...(fromProfile
                                ? [
                                    {
                                      label: 'Modify',
                                      onClick: open,
                                    },
                                    {
                                      label: 'Delete',
                                      onClick: () =>
                                        remove(label),
                                    },
                                  ]
                                : []),
                            ]}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            variant="selectedMenu"
                          >
                            {(o) => (
                              <IconButton
                                size="small"
                                onClick={o}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            )}
                          </DropDownMenu>
                        )}
                        renderContent={() => (
                          <FiltersName name={label}>
                            {(name, renderInput) => (
                              <FiltersForm
                                initialValues={
                                  initialValues
                                }
                                search={value}
                                onSave={modify(name, label)}
                              >
                                {(...params) => (
                                  <>
                                    <Grid item xs={12}>
                                      {renderInput()}
                                    </Grid>
                                    {children(...params)}
                                    <Grid item xs={12}>
                                      <Button type="submit">
                                        Save
                                      </Button>
                                    </Grid>
                                  </>
                                )}
                              </FiltersForm>
                            )}
                          </FiltersName>
                        )}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ),
              )}
            <FiltersAdd onSave={add} />
          </List>
        </Box>
      </Panel>
      <Panel title="Filters" badgeContent={numberApplied}>
        <FiltersForm
          initialValues={initialValues}
          search={location.search}
        >
          {(...params) => (
            <>
              {children(...params)}
              <Grid item xs={12}>
                <Grid container>
                  <FiltersClear />
                  <Button type="submit">Apply</Button>
                </Grid>
              </Grid>
            </>
          )}
        </FiltersForm>
      </Panel>
    </Box>
  );
};

Groups.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Groups;
