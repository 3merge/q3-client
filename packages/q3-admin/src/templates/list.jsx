/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import useRest, {
  getCSV,
  getForAutocomplete,
  useFilters,
} from 'q3-ui-rest';
import {
  DataLayer,
  QueryLayer,
} from 'q3-ui-forms/lib/builders/location';
import FromJson from 'q3-ui-forms/lib/builders/fromJson';
import Table from 'q3-ui/lib/table';
import Header from 'q3-ui/lib/header';
import SearchBar from 'q3-ui/lib/searchBar';
import { Create as CreateDialog } from 'q3-ui/lib/dialogs';
import { useAuth } from 'q3-ui-permissions';

export const getCSVByName = (name) => (ids = []) =>
  getCSV(`/${name}?_id=${ids.join(',')}`);

export const ListHeader = ({
  collectionName,
  resourceName,
  searchSchema,
  searchFields = [],
  children,
}) => {
  const { Hide } = useAuth(collectionName);
  const filters = useFilters({
    coll: collectionName,
    fields: searchFields,
  });

  console.log(filters)

  return (
    <div style={{ display: 'flex' }}>
      <SearchBar
        expanded
        filter={() =>
          searchSchema && searchFields ? (
            <DataLayer
              initialValues={searchFields.reduce(
                (a, item) =>
                  Object.assign(a, { [item]: '' }),
                {},
              )}
            >
              {() => (
                <FromJson
                  json={{
                    collectionName,
                    fields: searchSchema(filters),
                    bypassAuthorization: true,
                    isNew: true,
                  }}
                />
              )}
            </DataLayer>
          ) : null
        }
        getResults={(e) =>
          getForAutocomplete(
            `/${collectionName}?search=${e}&limit=25`,
            resourceName,
          )
        }
      />
      <Hide op="Create">{children}</Hide>
    </div>
  );
};

ListHeader.propTypes = {
  collectionName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const ListTable = ({
  removeBulk,
  patch,
  fetching,
  name,
  resourceName,
  collectionName,
  get: getService,
  ...rest
}) => {
  const { canDelete } = useAuth(collectionName);
  return (
    <Container>
      <Box my={6}>
        <Table
          {...rest}
          data={rest}
          name={resourceName}
          loading={fetching}
          poll={getService}
          rows={get(rest, resourceName, [])}
          mark={patch}
          downloadMany={getCSVByName}
          deleteMany={
            canDelete && removeBulk ? removeBulk : null
          }
        />
      </Box>
    </Container>
  );
};

ListTable.propTypes = {
  removeBulk: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  get: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

const List = ({
  name,
  addComponent: AddComponent,
  resourceName,
  resourceNameSingular,
  collectionName,
  inheritCollectionName,
  inheritResourceName,
  ...rest
}) => {
  if (inheritCollectionName) collectionName = name;
  if (inheritResourceName) resourceName = name;

  const { Redirect } = useAuth(collectionName);
  const { t } = useTranslation();
  const state = useRest({
    url: `/${name}`,
    key: resourceNameSingular,
    pluralized: resourceName,
    runOnInit: true,
    ...rest,
  });

  return (
    <Redirect op="Read" to="/">
      <Header
        name={t(`titles:${resourceName}`)}
        renderRight={() => (
          <ListHeader
            collectionName={collectionName}
            resourceName={resourceName}
            {...rest}
          >
            {AddComponent && (
              <CreateDialog
                render={(done) => (
                  <AddComponent done={done} {...state} />
                )}
              />
            )}
          </ListHeader>
        )}
      />
      <ListTable
        name={name}
        resourceName={resourceName}
        collectionName={collectionName}
        {...rest}
        {...state}
      />
    </Redirect>
  );
};

List.propTypes = {
  addComponent: PropTypes.node,
  fetching: PropTypes.bool,
  name: PropTypes.string.isRequired,
  enablePost: PropTypes.bool,
  totalDocs: PropTypes.number,
  post: PropTypes.func.isRequired,
  inheritCollectionName: PropTypes.bool,
  inheritResourceName: PropTypes.bool,
  resourceNameSingular: PropTypes.string.isRequired,
  resourceName: PropTypes.string,
  collectionName: PropTypes.string,
};

List.defaultProps = {
  addComponent: null,
  fetching: false,
  enablePost: false,
  totalDocs: 0,
  inheritCollectionName: false,
  inheritResourceName: false,
  resourceName: null,
  collectionName: null,
};

export default List;
