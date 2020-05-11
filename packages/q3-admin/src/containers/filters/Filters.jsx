import React from 'react';
import { get } from 'lodash';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import Box from '@material-ui/core/Box';
import { AuthContext } from 'q3-ui-permissions';
import Grid from '@material-ui/core/Grid';
import { Definitions } from '../state';
import withSearch from '../withSearch';
import FiltersForm from './FiltersForm';
import FiltersClear from './FiltersClear';
import FiltersDelete from './FiltersDelete';
import FiltersName from './FiltersName';
import Panel from '../../components/sidebar/panel';

const Groups = ({
  children,
  getActive,
  customFiltersApplied,
  ...etc
}) => {
  const { collectionName, rootPath } = React.useContext(
    Definitions,
  );

  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});
  const items = get(filters, collectionName, {});
  const active = getActive(items);

  const menuItems = Object.entries(items).map(
    ([key, query]) => ({
      onClick: () => navigate(query),
      label: key,
    }),
  );

  const patchProfile = (newFilterObj, done) => {
    const master = { ...filters };
    master[collectionName] = newFilterObj;

    return update(
      {
        filters: master,
      },
      done,
    );
  };

  const onModify = (name) => (query) => {
    if (name) {
      const copy = { ...items };

      // fully replace it
      delete copy[active];
      copy[name] = query;

      return patchProfile(copy, () =>
        navigate(`${rootPath}${query}`),
      );
    }
    navigate(`${rootPath}${query}`);
  };

  return (
    <Box>
      <Panel title="Segments">
        <Box>
          <FiltersName name={active}>
            {(name, renderInput) => (
              <FiltersForm
                {...etc}
                handleSave={onModify(name)}
              >
                {(...params) => (
                  <>
                    <Grid item xs={12}>
                      <DropDownMenu
                        id="q3-segments"
                        items={menuItems}
                        MenuListProps={{
                          style: {
                            width: 270,
                          },
                        }}
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
                        {(open) => (
                          <Button
                            onClick={open}
                            aria-controls="q3-segments"
                            aria-haspopup="true"
                            disabled={!menuItems.length}
                            size="large"
                            variant="contained"
                            fullWidth
                            style={{
                              justifyContent:
                                'space-between',
                            }}
                          >
                            {active || 'Default'}
                            <ExpandMore />
                          </Button>
                        )}
                      </DropDownMenu>

                      {renderInput()}
                      <br />
                    </Grid>
                    {children(...params)}
                    <Grid item xs={12}>
                      <ButtonGroup
                        size="small"
                        variant="text"
                      >
                        <FiltersDelete name={active} />
                        <Button type="submit">Apply</Button>
                        <FiltersClear />
                      </ButtonGroup>
                    </Grid>
                  </>
                )}
              </FiltersForm>
            )}
          </FiltersName>
        </Box>
      </Panel>
    </Box>
  );
};

Groups.propTypes = {
  children: PropTypes.node.isRequired,
  customFiltersApplied: PropTypes.number.isRequired,
  getActive: PropTypes.func.isRequired,
};

export default withSearch(Groups);
