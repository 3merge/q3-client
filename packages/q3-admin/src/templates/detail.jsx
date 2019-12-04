/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { get } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useAuth } from 'q3-ui-permissions';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Header from 'q3-ui/lib/header';
import Tabs from 'q3-ui/lib/tabs';
import useRest from 'q3-ui-rest';
import Trash from '../presets/trash';

const ellpisis = (title = '') =>
  title && title.length > 35
    ? `${title.substring(0, 35)}...`
    : title;

const Detail = ({
  name,
  pathToTitle,
  resourceName,
  resourceNameSingular,
  inheritCollectionName,
  inheritResourceName,
  collectionName,
  views,
  id,
  ...rest
}) => {
  if (inheritCollectionName) collectionName = name;
  if (inheritResourceName) resourceName = name;

  const url = `/${name}/${id}`;
  const state = useRest({
    runOnInit: true,
    key: resourceNameSingular,
    pluralized: resourceName,
    url,
    ...rest,
  });

  const { canDelete, canReadSub, ...authy } = useAuth(
    collectionName,
    get(state, `${resourceNameSingular}.createdBy.id`),
  );

  const tabs = Array.from(
    typeof views === 'function'
      ? views({ id, ...state, ...authy })
      : views,
  ).filter(({ field }) => {
    if (!field) return true;
    return canReadSub(field);
  });

  if (canDelete)
    tabs.push({
      label: 'Trash',
      to: '/trash',
      component: () => (
        <Trash
          next={state.remove(null)}
          redirect={`/${resourceName}`}
        />
      ),
    });

  return (
    <>
      <Header
        name={ellpisis(get(state, pathToTitle))}
        renderPreIdentifier={() => (
          <div>
            <IconButton
              component={Link}
              to={`/${resourceName}`}
            >
              <KeyboardBackspace />
            </IconButton>
          </div>
        )}
      />
      <Container>
        <Box my={6}>
          {state.fetching ? (
            <CircularProgress />
          ) : (
            <>
              <Tabs
                root={`/${resourceName}/${id}`}
                views={tabs}
              />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resourceNameSingular: PropTypes.string.isRequired,
  resourceName: PropTypes.string,
  collectionName: PropTypes.string,
  pathToTitle: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  views: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  inheritCollectionName: PropTypes.bool,
  inheritResourceName: PropTypes.bool,
};

Detail.defaultProps = {
  inheritCollectionName: false,
  inheritResourceName: false,
  resourceName: null,
  collectionName: null,
  views: [],
};

export default Detail;
