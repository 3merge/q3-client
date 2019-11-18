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

console.log(useAuth);

const Detail = ({
  name,
  pathToTitle,
  resourceName,
  resourceNameSingular,
  coll,
  views,
  id,
  ...rest
}) => {
  const url = `/${name}/${id}`;
  const state = useRest({
    runOnInit: true,
    key: resourceNameSingular,
    pluralized: resourceName,
    url,
    ...rest,
  });

  const { canDelete, canReadSub, ...authy } = useAuth(
    coll,
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
        name={get(state, pathToTitle)}
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
  name: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  canDelete: PropTypes.bool,
  loading: PropTypes.bool,
  views: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  services: PropTypes.shape({
    post: PropTypes.func,
    put: PropTypes.func,
    patch: PropTypes.func,
    delete: PropTypes.func,
  }).isRequired,
};

Detail.defaultProps = {
  canDelete: false,
  loading: false,
  views: [],
};

export default Detail;
