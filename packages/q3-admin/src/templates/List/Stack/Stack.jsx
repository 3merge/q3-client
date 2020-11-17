import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { Tabs, Tab, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from 'q3-ui/lib/iconButton';
import { useSegments } from 'q3-hooked';
import Article from '../../../components/Article';
import { useAppContext } from '../../../hooks';
import CollectionDatasource from '../../../containers/CollectionDatasource';
import CollectionFilter from '../../../containers/CollectionFilter';
import List from '../../../containers/table';

export default ({
  filterComponent: Filter,
  resolvers,
  ...rest
}) => {
  const { can } = useAppContext({
    filter: Filter ? (
      <Dialog
        renderTrigger={(onClick) => (
          <IconButton
            label="filter"
            icon={FilterListIcon}
            buttonProps={{
              onClick,
            }}
          />
        )}
        renderContent={() => (
          <CollectionFilter {...rest}>
            <Filter />
          </CollectionFilter>
        )}
        variant="drawer"
      />
    ) : null,
  });

  const { filters, getCurrent } = useSegments();

  return (
    <Article>
      <Box
        alignItems="center"
        component="header"
        display="flex"
        justifyContent="space-between"
        px={2}
        pt={2}
        pb={1}
      >
        <Typography component="h1" variant="h5">
          Collection name here
        </Typography>

        <Box>
          {can('filter')}
          EXPORT/IMPORT ADD
        </Box>
      </Box>
      <Box
        component="nav"
        style={{ borderBottom: '2px solid #F5F7F9' }}
      >
        <Tabs value={getCurrent()}>
          {filters.map((item) => (
            <Tab
              component={item.renderer}
              key={item.searchValue}
              label={item.label}
              value={item.searchValue}
            />
          ))}
        </Tabs>
      </Box>
      <CollectionDatasource {...rest}>
        <List {...rest} />
      </CollectionDatasource>
    </Article>
  );
};
